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
    <!-- 菜单添加/修改 -->
    <el-dialog :title="'角色'+tip" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限" :label-width="formLabelWidth" class="ta">
          <el-checkbox label="1" v-model="form.menus" class="el-icon-caret-right">系统设置</el-checkbox>
          <el-checkbox label="2" v-model="form.menus" class="el-icon-caret-right">商城管理</el-checkbox>
          <el-tree
          :props="props"
          :load="loadNode"
          lazy
          show-checkbox
          @check-change="handleCheckChange"
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
      formLabelWidth: "200px",
      tip: "添加",
      form: {
        rolename: "",
        menus: [],
        status: true,
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
    // 修改按钮
    handleEdit() {
      this.dialogFormVisible = true;
    },
    // 删除按钮
    handleDelete(row) {
      let id = row.id;
      this.http.post("/api/roledelete", { id }).then((res) => {
        console.log(res);
      });
    },
   handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      handleNodeClick(data) {
        console.log(data);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: 'region1' }, { name: 'region2' }]);
        }
        if (node.level > 3) return resolve([]);

        var hasChild;
        if (node.data.name === 'region1') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [{
              name: 'zone' + this.count++
            }, {
              name: 'zone' + this.count++
            }];
          } else {
            data = [];
          }

          resolve(data);
        }, 500);
      }
    },
  mounted() {
    this.http.get("/api/rolelist").then((res) => {
      // console.log(res.list);
      if (res.code == 200) {
        this.tableData = res.list || [];
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
  width: 200px;
}
</style>