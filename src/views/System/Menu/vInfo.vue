<template>
  <div class="Info">
    <el-dialog
      :title="info.isAdd?'添加菜单':'修改菜单'"
      :visible.sync="info.isShow"
      width="30%"
      class="Info-title"
      @close="cancel()"
    >
      <el-form :model="formInfo" class="Info-main" :rules="rules" ref="from">
        <el-form-item label="目录/菜单选择">
          <el-select v-model="formInfo.type" placeholder="请选择菜单类型">
            <el-option label="目录" value="1">目录</el-option>
            <el-option label="菜单" value="2">菜单</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上级目录" v-if="formInfo.type==2">
          <el-select placeholder="请选择" v-model="formInfo.pid" class="mulu-op">
            <el-option label="顶级目录" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :label="item.title"
              :value="item.id"
              :key="item.id"
              v-if="item.type==1"
            ></el-option>
            <p v-for="item in menuList" :key="item.id">{{item.title}}</p>
            <!-- 上面报错是插件vetur的错误  不允许v-for 和 v-if一起使用-->
          </el-select>
        </el-form-item>

        <el-form-item :label="formInfo.type==1? '目录名称':'菜单名称'" prop="title">
          <el-input v-model="formInfo.title" placeholder="请输入标题 "></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="formInfo.icon" placeholder="目录图标Class"></el-input>
        </el-form-item>
        <el-form-item label="菜单地址" v-if="formInfo.type==2" prop="url">
          <el-input v-model="formInfo.url" placeholder="请输入菜单/目录地址"></el-input>
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
import { menuLsit, menuAdd, menuEdit, menuList } from "../../../request/menu";
import { mapGetters, mapActions } from "vuex";
let defaultFormInfo = {
  pid: 0,
  title: "",
  icon: "",
  type: "", //1是目录 2是菜单
  url: "",
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
        title: [{ required: true, message: "必填！", trigger: "blur" }],
        icon: [{ required: true, message: "必填！", trigger: "blur" }],
        url: [{ required: true, message: "必填！", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/menuList",
    }),
  },
  methods: {
    async submit() {
      //  提交请求
      this.$refs.from.validate(async (valid) => {
        if (valid) {
          //验证成功发送请求
          let res;
          if (this.info.isAdd) {
            //判断是添加还是修改
            res = await menuAdd(this.formInfo);
          } else {
            res = await menuEdit(this.formInfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_menu_list(); //再次获取列表，让仓库数据是最新的
            // this.reset(); //无论是修改成功 还是添加成功  都应该让表单为空
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
      this.formInfo = { ...defaultFormInfo };
    },
    //点击小窗口上的x   无论添加或修改成功 表单关闭的时候 都让弹窗为空
    cancel() {
      this.formInfo = { ...resetInfo };
    },
    //
    setInfo(val) {
      // 将数据赋值给默认 defaultFormInfo  赋给表单
      defaultFormInfo = { ...val };
      this.formInfo = { ...val };
    },
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
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
.Info-title {
  text-align: center;
}
.Info-main {
  width: 100%;
  text-align: center;
  /* margin-left: 0px; */
}
.mulu-op {
  margin-left: 36px;
}
</style>