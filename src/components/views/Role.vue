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
    <!-- 添加/修改 -->
    <el-dialog :title="'角色'+tip" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限" :label-width="formLabelWidth" class="ta">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[1]"
            label='系统设置'
          ></el-tree>
        </el-form-item>

        <el-form-item label="状态" style="text-align:left" :label-width="formLabelWidth">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
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
      data:[],
      formLabelWidth: "200px",
      tip: "添加",
      form: {
        rolename: "",
        menus: [],
        status: true,
      },
      //  data: [
      //     {
      //     id: 1,
      //     label: '一级 2',
      //     children: [{
      //       id: 2,
      //       label: '二级 2-1'
      //     }, {
      //       id: 3,
      //       label: '二级 2-2'
      //     }]
      //   }, {
      //     id: 4,
      //     label: '一级 3',
      //     children: [{
      //       id: 5,
      //       label: '二级 3-1'
      //     }, {
      //       id: 6,
      //       label: '二级 3-2'
      //     }]
      //   }],
      //   defaultProps: {
      //     children: 'children',
      //     label: 'label'
      //   },
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
    // 确认添加
    handleSubmit(formName) {
      this.$refs[formName].validate((vaild) => {
        if (!vaild) {
          return false;
        }
        // 判断状态是否启用
        this.form.status = this.form.status ? "1" : "2";
        // 判断是编辑还是添加
        let url = this.form.id ? "/api/roleedit" : "/api/roleadd";
        dialogFormVisible: false,
          this.http.post(url, this.from).then((res) => {
            console.log(res);
          });
      });
    },
    // 添加按钮
    handleAdd() {
      this.dialogFormVisible = true;

    },
    // 渲染弹窗内容
    getmenu(){
      
    },
    // 修改按钮
    handleEdit() {
      this.dialogFormVisible = true;
    },
    // 删除按钮
    handleDelete(row) {
      let id = row.id;
      this.http.post("/api/roledelete", { id }).then((res) => {
        // console.log(res);
      });
    },
  },
  mounted() {
    this.http.get("/api/rolelist").then((res) => {
      // console.log(res.list);
      if (res.code == 200) {
        this.tableData = res.list || [];
        console.log(this.tableData);
      } else if (res.code == 403) {
        this.$message(res.msg);
      } else {
        this.$message("访问权限受限,请登录");
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
.ta {
  /* text-align-last: left; */
  width: 500px;
}
</style>