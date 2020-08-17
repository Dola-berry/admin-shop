<template>
  <el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="btn">
      <el-button type="primary" @click="handleAdd()">添加</el-button>
      <Main />
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="名称" width="180">
        <template slot-scope="scope">{{ scope.row.rolename}}</template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" size="small" type="success">启用</el-tag>
          <el-tag v-else-if="scope.row.status === 2" size="small" type="info">未启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加/修改 -->
    <el-dialog :title="'角色'+tip" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop='rolename'>
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限" :label-width="formLabelWidth">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[form.menus]"
            :props="defaultProps"
            ref="tree"
          ></el-tree>
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
      dialogFormVisible: false,
      tableData: [],
      data: [],
      formLabelWidth: "200px",
      tip: "添加",
      form: {
        rolename: "",
        menus: [],
        status: true,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      // 定义规则
      rules: {
        rolename: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 添加按钮
    handleAdd() {
      this.dialogFormVisible = true;
      this.data = JSON.parse(sessionStorage.getItem("list")).menus;
    },
    // 确认添加
    handleSubmit(formName) {
      this.$refs[formName].validate((vaild) => {
        if (!vaild) {
          return false;
        }
        // 判断状态是否启用
        this.form.status = this.form.status ? 1 : 2;
        // 判断是编辑还是添加
        let url = this.form.id ? "/api/roleedit" : "/api/roleadd";
        this.dialogFormVisible = false;
        // 保存树状选中框
        this.form.menus = this.$refs.tree
          .getCheckedKeys()
          .concat(this.$refs.tree.getHalfCheckedKeys());
        // 将数据提交到后台
        this.http.post(url, this.form).then((res) => {
          if (res.code == 200) {
            this.$message(res.msg);
          } else {
            this.$message(res.msg);
          }
          this.handleReset();
          // 重新获取数据渲染
          this.roleList();
        });
      });
    },
    roleList() {
      // 获取用户列表
      this.http.get("/api/rolelist").then((res) => {
        if (res.code == 200) {
          this.tableData = res.list || [];
        } else if (res.code == 403) {
          this.$message(res.msg);
        } else {
          this.$message("访问权限受限,请登录");
        }
      });
    },
    // 弹窗关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 修改按钮
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.tip = "修改";
      this.data = JSON.parse(sessionStorage.getItem("list")).menus;
      let id = row.id;
      this.http.get("/api/roleinfo", {id}).then((res) => {
        let info = res.list;
        info.id = id;
        info.status = info.status == 1 ? true : false;
        // 保存树状选中框
        // info.menus = info.menus.splite()
        this.form = info;
        // console.log(info.menus);
        this.roleList();
      });
    },
    // 删除按钮
    handleDelete(row) {
      let id = row.id;
      this.http.post("/api/roledelete", { id }).then((res) => {
        if(res.code == 200) this.roleList();
        this.$message(res.msg)
      });
    },
    // 取消
    handleReset() {
      this.dialogFormVisible = false;
      this.tip = "添加";
      this.form = {
        rolename: "",
        menus: [],
        status: true,
      };
    },
  },
  mounted() {
    this.roleList();
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