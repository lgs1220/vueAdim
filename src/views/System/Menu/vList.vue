<template>
  <div class="table-list">
    <el-table
      :stripe="true"
      style="width: 100%"
      :data="menuList"
      row-key="id"
      :tree-props="{children:'children'}"
    >
      <el-table-column label="id" width="100" prop="id" align="center"></el-table-column>
      <el-table-column label="菜单名称" width="100" prop="title" align="center"></el-table-column>
      <el-table-column label="菜单地址" width="300" prop="url" align="center"></el-table-column>
      <el-table-column label="目录图标" width="180" prop="icon" align="center">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="180" prop="type" align="center">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.type==1">目录</el-tag>
          <el-tag type="warning" v-if="scope.row.type==2">菜单</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="修改" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="small"
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
            @click="del(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { menuLsit, menuAdd, menuEdit, menuDel } from "../../../request/menu";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  mounted() {
    if (!this.menuList.length) {
      this.get_menu_list();
    }
  },
  computed: {
    ...mapGetters({
      menuList: "menu/menuList",
    }),
  },
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
    }),
    //删除数据
    async del(id) {
      this.$confirm("是否继续删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await menuDel(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_menu_list();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //修改数据列表
    edit(val) {
      this.$emit("edit", { ...val });
    },
  },

  watch: {},
};
</script>
 <style  scoped>
/* .table-list {
  margin: 10px 20px;
} */
</style>