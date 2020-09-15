<template>
  <div>
    <!-- <h1>xx管理系统</h1>
    <ul>
      <li>
        <router-link to="/index">后台首页</router-link>
      </li>
      <li>
        <router-link to="/menu">菜单管理</router-link>
      </li>
      <li>
        <router-link to="/role">角色管理</router-link>
      </li>
      <li>
        <router-link to="/user">管理员管理</router-link>
      </li>
      <li>
        <router-link to="/banner">轮播管理</router-link>
      </li>
      <li>
        <router-link to="/category">商品分类</router-link>
      </li>
      <li>
        <router-link to="/member">会员管理</router-link>
      </li>
      <li>
        <router-link to="/seckill">秒杀活动</router-link>
      </li>
      <li>
        <router-link to="/specs">商品规格</router-link>
      </li>
      <li>
        <router-link to="/goods">商品管理</router-link>
      </li>
      <li>
        <router-link to="/user">管理员管理</router-link>
      </li>
    </ul>-->
    <el-container class="page">
      <el-aside :width="isCollapse?'200px':'0px'" class="page-nav">
        <left></left>
      </el-aside>
      <el-container class="page-content">
        <el-header class="page-header">
          <top></top>
        </el-header>
        <el-main class="page-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import top from "./top";
import left from "./left";
import { mapState } from "vuex";

export default {
  name: "",
  components: {
    left,
    top
  },
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  activited() {},
  update() {},
  methods: {},
  filter: {},
  computed: {
    ...mapState(["isCollapse"])
  },
  watch: {}
};
</script>

<style  scoped>
.page {
  width: 100vw;
  height: 100vh;
}
.page-content {
  height: 100%;
}
.page-header {
  background-color: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.9);
}
.page-nav {
  height: 100%;
  background-color: #f1f2f6;
}
</style>
