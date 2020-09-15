<template>
  <div>
    <el-row class="login-bg">
      <el-col :span="8" class="login-box">
        <h3>小U商城管理系统</h3>
        <el-form :model="form" ref="form" label-width="200px">
          <el-input placeholder="请输入账号" v-model="form.name" class="el-input">
            <template slot="prepend">账号</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="form.pass" class="el-input" show-password>
            <template slot="prepend">密码</template>
          </el-input>
          <el-button
            type="primary"
            class="btn"
            @click="login()"
          >登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: "",
        pass: ""
      }
    };
  },
  created() {},
  mounted() {},
  activited() {},
  update() {},
  methods: {
    login() {
      console.log("登陆");
    }
  },
  filter: {},
  computed: {},
  watch: {}
};
</script>

<style  scoped>
.login-bg {
  display: none;
  /* width: 100vw; */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/img/timg.jpg");
  background-size: 100% 100%;
  /* background-repeat: no-repeat; */
}
.login-box {
  background-color: white;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
  padding: 40px 40px;
  border-radius: 10px;
}
.login-box h3 {
  text-align: center;
  margin: 10px 0;
}
.login-box .btn {
  display: block;
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
}
.login-box .el-input {
  margin: 10px auto;
}
</style>
