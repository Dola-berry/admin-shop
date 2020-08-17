<template>
  <el-main>
    <!-- 面包屑导航 
        separator：分隔符
        to：导航属性
    -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加按钮 -->
    <el-row class="btn">
      <el-button type="primary" @click="handleAdd()">添加</el-button>
    </el-row>
    <Main />
    <!-- 菜单列表  表格容器
    data:表格显示数据
    tree-props:二级的表格数据设定
    -->
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="名称" width="180">
        <!-- scope.row  作用域 数据，代表当前的数据对象 -->
        <template v-slot="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型">
        <template v-slot="scope">
          <el-tag v-if="scope.row.type === 1" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === 2" size="small" type="success">菜单</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="60"></el-table-column>
      <el-table-column prop="navUrl" label="菜单URL">
        <template slot-scope="scope">
          <span>{{scope.row.url}}</span>
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
    <el-dialog :title="'菜单'+tip" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="菜单名称" :label-width="formLabelWidth" style="text-align:left" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择上级菜单" @change="menuchange($event)">
            <el-option value="0" label="顶级菜单"></el-option>
            <el-option v-for="item in menus" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-show="form.pid === '0'">
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" class="ta">
          <!-- <el-radio-group> -->
          <el-radio label="1" v-model="form.type" :disabled="form.type === '2'">目录</el-radio>
          <el-radio label="2" v-model="form.type" :disabled="form.type === '1'">菜单</el-radio>
          <!-- </el-radio-group> -->
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-show="form.type == '2'">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" style="text-align:left" :label-width="formLabelWidth">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset('form')">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      tip: "添加",
      tableData: [],
      menus: [],
      // form表单
      form: {
        pid: "0",
        title: "",
        icon: "",
        type: "1",
        url: "",
        status: true,
      },
      // 表单域标签的宽度
      formLabelWidth: "120px",
      // 弹窗是否打开
      dialogFormVisible: false,
      // 定义规则
      rules: {
        pid: {
          required: true,
          message: "请选择上级菜单",
          trigger: "blur",
        },
        title: [
          { required: true, message: "请输入菜单标题", trigger: "blur" },
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
  mounted() {
    this.menulist()
  },
  methods: {
    menulist() {
      // 获取菜单列表
      this.http.get("/api/menulist?istree=1").then((res) => {
        // 获取成功时
        if (res.code == 200) {
          this.tableData = res.list || [];
        } else if (res.code == 403) {
          this.$message(res.msg);
        } else {
          // 访问时间限制
          this.$message("访问权限受限,请登录");
        }
      });
    },
    // 点击添加按钮
    handleAdd() {
      // 显示弹窗对话框
      this.dialogFormVisible = true;
      //调用getMenu
      this.getMenu();
    },
    // 获取菜单
    getMenu() {
      // pid = 0 获取菜单   不包含目录
      this.http.get("/api/menulist?pid=0").then((res) => {
        this.menus = res.list;
      });
    },
    // 判断当前的类型
    menuchange(e) {
      this.form.type = e != "0" ? "2" : "1";
    },
    // 添加确认函数
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        // 判断状态是否启用
        this.form.status = this.form.status ? "1" : "2";
        // 判断是编辑还是添加
        let url = this.form.id ? "/api/menuedit" : "/api/menuadd";
        // 提交到后台
        this.http.post(url, this.form).then((res) => {
          // 添加成功的提示信息
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success",
            });
            //关闭弹框
            (this.dialogFormVisible = false),
            this.handleReset()
              // 重新获取菜单
             this.menulist()
          } else {
            // 添加失败提示信息
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
          }
        });
      });
    },
    // 取消按钮（重置form）
    handleReset() {
      this.dialogFormVisible = false;
      this.tip = "添加";
      this.form = {
        pid: "0",
        title: "",
        icon: "",
        type: "1",
        url: "",
        status: true,
      };
    },
    // 弹窗关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    
    // 编辑：
    handleEdit(row) {
      // 显示弹窗对话框
      this.dialogFormVisible = true;
      this.tip = "修改";
      //调用getMenu
      this.getMenu();
      // 获取当前行的id
      let id = row.id;
      // console.log(id);
      // 获取当前id对应的数据
      this.http.get("/api/menuinfo", { id }).then((res) => {
        // 定义变量接受数据
        let info = res.list;
        // 将当前id赋值给info
        info.id = id;
        // 将当前类型以字符串格式赋值给info
        info.type = info.type.toString();
        // 判断当前状态是启用还是禁止
        info.status = info.status == 1 ? true : false;
        // 判断当前是一级菜单还是二级菜单
        info.pid = info.pid == "0" ? "0" : info.pid;
        // 将数据渲染到页面
        this.form = info;
      });
    },
    // 删除函数
    handleDelete(row) {
      // console.log(row.id);
      // 提交删除数据
      this.http.post("/api/menudelete", { id: row.id }).then((res) => {
        // 删除成功重新渲染数据
        if (res.code == 200) {
          this.tableData = res.list;
        } else {
          // 否则弹出错误信息
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        }
      });
    },
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
  width: 300px;
}
</style>