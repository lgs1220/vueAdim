<template>
  <div>
    <el-button type="primary" @click="add()">添加角色</el-button>
    <v-list @edit="edit"></v-list>
    <v-info :info="info" ref="dialog"></v-info>
  </div>
</template>

<script>
import vList from "./vList";
import vInfo from "./vInfo";
export default {
  name: "",
  components: {
    vList,
    vInfo,
  },
  props: {},
  data() {
    return {
      info: {
        isAdd: false,
        isShow: false,
      },
    };
  },
  created() {},
  mounted() {},
  activited() {},
  update() {},
  methods: {
    add() {
      this.info.isAdd = this.info.isShow = true;
    },
    edit(val) {
      this.info.isAdd = false;
      this.info.isShow = true;
      // 调用组件里面的方法
      this.$refs.dialog.setInfo(val);
      console.log(val);
    },
  },
  filter: {},
  computed: {},
  watch: {},
};
</script>

<style  scoped>
</style>
