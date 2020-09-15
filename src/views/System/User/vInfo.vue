<template>
  <div class="Info">
    <el-dialog
      :title="info.isAdd?'添加管理员':'修改管理员'"
      :visible.sync="info.isShow"
      width="50%"
      class="Info-title"
      @close="cancel()"
    >
      <el-form :model="formInfo" class="Info-main" :rules="rules" ref="from">
        <el-form-item label="管理员角色" prop="roleid">
          <el-select v-model="formInfo.roleid" placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="管理员名称" prop="username">
          <el-input v-model="formInfo.username" placeholder="请输入管理员名称"></el-input>
        </el-form-item>

        <el-form-item label="管理员密码" prop="password" v-if="info.isAdd">
          <el-input v-model="formInfo.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="password1" v-else>
          <el-input v-model="formInfo.password" placeholder="密码留空表示不修改密码"></el-input>
        </el-form-item>

        <el-form-item label="管理员状态">
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
import { userAdd, userDel, userEdit, userList } from "../../../request/user";
import { mapGetters, mapActions } from "vuex";
let defaultFormInfo = {
  roleid: "", //管理员id
  username: "", //管理员名称
  password: "", //管理员密码
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
        roleid: [{ required: true, message: "必填！", trigger: "blur" }],
        username: [{ required: true, message: "必填！", trigger: "blur" }],
        password: [{ required: true, message: "必填！", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      userList: "user/userList",
      roleList: "role/roleList",
    }),
  },
  mounted() {
    if (!this.roleList.length) {
      this.get_role_list();
    }
  },
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list",
      get_user_list: "user/get_user_list",
    }),
    async submit() {
      console.log(this.formInfo.password);
      if (this.info.isAdd && !this.formInfo.password) {
        this.$message.warning("请输入管理员密码");
        return;
      }
      this.$refs.from.validate(async (valid) => {
        if (valid) {
          //验证成功发送请求
          let res;
          if (this.info.isAdd) {
            //判断是添加还是修改
            res = await userAdd(this.formInfo);
          } else {
            res = await userEdit(this.formInfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_user_list(); //重新获取管理员列表；
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
      } else {
        this.setInfo({ ...resetInfo });
      }
    },
    cancel() {
      this.formInfo = { ...resetInfo };
    },

    setInfo(val) {
      // 将数据赋值给默认 defaultFormInfo  赋给表单
      val.password = "";
      defaultFormInfo = { ...val };
      this.formInfo = { ...val };
    },
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