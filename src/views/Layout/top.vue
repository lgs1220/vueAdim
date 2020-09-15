<template>
  <div class="top">
    <div class="lt">
      <el-button type="primary" icon="el-icon-s-promotion" size="small" @click="Toggle()"></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="mianbao">
        <el-breadcrumb-item :to="{ path: '' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="text" icon="el-icon-back" class="lt-black"></el-button>
    </div>
    <div>
      <el-col :span="12">
        <el-dropdown class="xiala">
          <span>
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-loading">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["Toggle"])
  },
  mounted() {},
  watch: {}
};
</script>
 <style  scoped>
.top {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.lt {
  display: flex;
  align-items: center;
}
.lt .mianbao {
  margin: 0 30px;
}
.lt-black {
  font-size: 24px;
}
.xiala {
  width: 100px;
}
</style>