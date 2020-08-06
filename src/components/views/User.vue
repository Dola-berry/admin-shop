<template>
  <el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="btn">
      <el-button type="primary" @click="handleAdd()">添加</el-button>
      <Main />
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="用户编号" width="380">
        <template slot-scope="scope">{{scope.row.uid}}</template>
      </el-table-column>
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">{{scope.row.rolename}}</template>
      </el-table-column>
      <el-table-column prop="uname" label="用户名" width="180">
        <template slot-scope="scope">{{scope.row.username}}</template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" size="small" type="success">启用</el-tag>
          <el-tag v-else-if="scope.row.status === 2" size="small">未启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1"></el-pagination>
    <!-- 添加/修改 -->
    <el-dialog :title="'管理员'+tip" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item
          label="角色"
          :label-width="formLabelWidth"
          style="text-align:left"
          v-model="form.roleid"
        >
          <el-select placeholder="请选择角色" v-model="form.roleid">
            <el-option
              v-for="item in menus"
              :key="item.id"
              :label="item.rolename"
              :value="item.roleid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" style="text-align:left" :label-width="formLabelWidth">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset()">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      menus: [],
      tip: "添加",
      dialogFormVisible: false,
      formLabelWidth: "200px",
      form: {
        roleid: "",
        username: "",
        password: "",
        status: true,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 取消
    handleReset() {
      this.dialogFormVisible = false;
      this.tip = "添加";
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: true,
      };
    },
    // 删除按钮
    handleDelete(row) {
      this.http.post("/api/userdelete", { id: row.id }).then((res) => {
        if (res.code == 200) {
          console.log(res.list);
          this.tableData = res.list;
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    //编辑按钮
    handleEdit(row) {
      // 显示弹窗对话框
      this.dialogFormVisible = true;
      this.tip = "修改";
      //调用getMenu
      this.getMenu();
      let uid = row.uid;
      // console.log(uid);
      this.http.get("/api/userinfo", { uid }).then((res) => {
        if (res.code == 200) {
          // console.log(res);
          let info = res.list;
          info.id = row.id;
          info.status = info.status == 1 ? true : false;
          info.roleid = info.roleid;
          info.username = info.username;
          info.password = info.password;
          this.form = info;
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    // 确认添加按钮
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        // 判断状态是否启用
        this.form.status = this.form.status ? "1" : "2";
        // // 判断是编辑还是添加
        let url = this.form.id ? "/api/useredit" : "/api/useradd";
        // 提交到后台
        this.http.post(url, this.form).then((res) => {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
          //关闭弹框
          (this.dialogFormVisible = false),
            // 重新获取菜单
            this.http.get("/api/userlist?size=10&page=1").then((res) => {
              this.tableData = res.list;
            });
        });
      });
    },
    // 添加按钮
    handleAdd() {
      this.dialogFormVisible = true;
      this.getMenu();
    },
    // 获取菜单
    getMenu() {
      this.http.get("/api/userlist?size=2&page=1").then((res) => {
        // console.log(res.list[0].roleid);
        this.menus = res.list;
      });
    },
  },
  mounted() {
    this.http.get("/api/userlist", { size: 10, page: 1 }).then((res) => {
      // console.log(res.list);
      if (res.code == 200) {
        this.tableData = res.list;
      } else if (res.code == 403) {
        this.$message(res.msg);
      } else {
        this.$message("访问权限受限，请登录！");
      }
    });
  },
};
</script>
<style lang="" scoped>
.btn {
  overflow: hidden;
  margin: 10px 0;
}
.btn button {
  float: left;
}
</style>