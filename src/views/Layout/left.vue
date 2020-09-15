<template>
  <div class="Left">
    <h3 class="Left-title">小U商城后台管理</h3>
    <el-menu
      :default-active="$route.path"
      active-text-color="#17c0eb"
      router
    >
      <el-menu-item index="/index">
        <i class="el-icon-document"></i>
        <span slot="title">主页</span>
      </el-menu-item>

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item-group router>
          <el-menu-item index="/menu">
            <i class="el-icon-menu"></i>菜单管理
          </el-menu-item>
          <el-menu-item index="/role">
            <i class="el-icon-user"></i>角色管理
          </el-menu-item>
          <el-menu-item index="/user">
            <i class="el-icon-user-solid"></i>管理员管理
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span>商城管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/goods">
            <i class="el-icon-goods"></i>商品管理
          </el-menu-item>
          <el-menu-item index="/specs">
            <i class="el-icon-s-platform"></i>规格管理
          </el-menu-item>
          <el-menu-item index="/category">
            <i class="el-icon-s-grid"></i>分类管理
          </el-menu-item>
          <el-menu-item index="/member">
            <i class="el-icon-s-custom"></i>会员管理
          </el-menu-item>
          <el-menu-item index="/banner">
            <i class="el-icon-picture"></i>轮播图管理
          </el-menu-item>
          <el-menu-item index="/seckill">
            <i class="el-icon-message-solid"></i>秒杀管理
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {}
};
</script>
 <style  scoped>
.Left-title {
  line-height: 60px;
  text-align: center;
  color: #3867d6;
  background-color: #dfe4ea;
}
</style>