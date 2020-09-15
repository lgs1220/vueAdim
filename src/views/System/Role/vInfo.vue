<template>
  <div class="Info">
    <el-dialog
      :title="info.isAdd?'添加角色':'修改角色'"
      :visible.sync="info.isShow"
      width="50%"
      class="Info-title"
      @close="cancel()"
    >
      <el-form :model="formInfo" class="Info-main" :rules="rules" ref="from">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="formInfo.rolename" placeholder="请输入角色名称"></el-input>
        </el-form-item>

        <el-form-item label="角色权限">
          <el-tree
            show-checkbox
            :props="{children:'children',label:'title'}"
            :data="menuList"
            ref="tree"
            node-key="id"
            :check-strictly="checkStrictly"
          ></el-tree>
        </el-form-item>

        <el-form-item label="禁用">
          <el-switch v-model="formInfo.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="warning" @click="reset()">重置</el-button>
          <el-button type="primary" @click="submit()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { roleLsit, roleAdd, roleEdit, menuList } from "../../../request/role";
import { mapGetters, mapActions } from "vuex";
let defaultFormInfo = {
  rolename: "", //角色名称
  menus: "", //角色权限
  status: 1, //状态 1是正常 2禁用
};
let resetInfo = { ...defaultFormInfo };
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          isShow: false,
        };
      },
    },
  },
  components: {},
  data() {
    return {
      formInfo: { ...defaultFormInfo },
      rules: {
        //验证规则对象
        rolename: [{ required: true, message: "必填！", trigger: "blur" }],
      },
      //树的关联严格和不严格 切换
      checkStrictly: false, // false 表示父子关联   true 表示父子不关联
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/menuList",
      roleLsit: "role/roleList",
    }),
  },
  methods: {
    async submit() {
      //  提交请求
      // 获取树形控件选中的节点
      let idarr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      if (!idarr.length) {
        this.$message.error("请选择用户权限");
        return;
      } else {
        this.formInfo.menus = idarr;
      }
      this.$refs.from.validate(async (valid) => {
        if (valid) {
          //验证成功发送请求
          let res;
          if (this.info.isAdd) {
            //判断是添加还是修改
            res = await roleAdd(this.formInfo);
          } else {
            res = await roleEdit(this.formInfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_menu_list(); //再次获取列表，让仓库数据是最新的
            this.get_role_list(); //重新获取角色列表；
            // this.reset(); //无论是修改成功 还是添加成功  都应该让表单为空
            this.$refs.tree.setCheckedKeys([]); //让树的选中为空
            this.formInfo = { ...resetInfo };
            this.info.isShow = false;
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      //重置按钮
      //判断是添加的重置还是 修改的重置
      if (this.info.isAdd) {
        this.formInfo = { ...resetInfo };
        this.$refs.tree.setCheckedKeys([]); //让树的选中为空
      } else {
        this.setInfo({ ...resetInfo });
      }
    },
    cancel() {
      this.formInfo = { ...resetInfo };
      this.$refs.tree.setCheckedKeys([]); //让树的选中为空
    },

    setInfo(val) {
      // 将数据赋值给默认 defaultFormInfo  赋给表单
      defaultFormInfo = { ...val };
      this.formInfo = { ...val };
      // nextTick 等节点渲染完成后执行函数
      this.checkStrictly = true;
      this.$nextTick(() => {
        // 将权限节点 回显到树种去
        let idarr = val.menus.split(",");
        if (idarr[0]) {
          this.$refs.tree.setCheckedKeys(idarr);
        }
        this.checkStrictly = false;
      });
    },
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
      get_role_list: "role/get_role_list",
    }),
  },
  mounted() {
    if (!this.menuList.length) {
      this.get_menu_list();
    }
  },
  watch: {},
};
</script>
 <style  scoped>
/* .Info-title {
  text-align: center;
}
.Info-main {
  width: 100%;
  text-align: center;
  margin-left: 0px;
} */
/* .mulu-op {
  margin-left: 36px;
} */
/* .RoleMenu .el-tree {
  float: none !important;
  overflow: hidden;
} */
.el-form-item__label {
  float: none !important;
}
</style>