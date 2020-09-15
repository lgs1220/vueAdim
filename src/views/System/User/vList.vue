<template>
  <div class="table-list">
    <el-table :stripe="true" style="width: 100%" :data="userList">
      <el-table-column label="uid" width="300" prop="uid" align="center"></el-table-column>
      <el-table-column label="管理员名称" width="180" prop="username" align="center"></el-table-column>
      <el-table-column label="管理员角色" width="180" prop align="center">
        <template slot-scope="scope">
          <el-tag
            type="success"
            v-for="item in roleList"
            :key="item.id"
            v-if="scope.row.roleid ==item.id"
          >{{item.rolename}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="管理员状态" width="180" prop="type" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
          <el-tag type="warning" v-if="scope.row.status==2">禁用</el-tag>
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
            @click="del(scope.row.uid)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="size"
      :page-sizes="[10,20,30]"
      layout="total, prev, pager, next"
      :total="100"
      background
    ></el-pagination>
  </div>
</template>

<script>
import { userDel } from "../../../request/user";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  mounted() {
    if (!this.userList.length) {
      this.get_user_list();
    }
    if (!this.roleList.length) {
      this.get_role_list();
    }
    let a = this.roleList;
    console.log(a);
  },
  computed: {
    ...mapGetters({
      userList: "user/userList",
      roleList: "role/roleList",
      page: "role/page",
      size: "size/size",
    }),
  },
  methods: {
    ...mapActions({
      get_user_list: "user/get_user_list",
      get_role_list: "role/get_role_list",
    }),
    //删除数据
    async del(uid) {
      this.$confirm("是否继续删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await userDel(uid);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_user_list();
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