<template>
  <div class="table-list">
    <el-table :stripe="true" style="width: 100%" :data="roleList">
      <el-table-column label="id" width="100" prop="id" align="center"></el-table-column>
      <el-table-column label="角色名称" width="100" prop="rolename" align="center"></el-table-column>
      <el-table-column label="状态" width="180" prop="type" align="center">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="warning" v-if="scope.row.status ==2">禁用</el-tag>
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
import { roleDel } from "../../../request/role";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  mounted() {
    if (!this.roleList.length) {
      this.get_role_list();
    }
  },
  computed: {
    ...mapGetters({
      roleList: "role/roleList",
    }),
  },
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list",
    }),
    //删除数据
    async del(id) {
      this.$confirm("是否继续删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await roleDel(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_role_list();
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