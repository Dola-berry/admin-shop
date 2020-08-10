<template>
  <el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="昵称" width="180">
        <template slot-scope="scope">{{scope.row.nickname}}</template>
      </el-table-column>
      <el-table-column label="手机号" width="180">
        <template slot-scope="scope">{{scope.row.phone}}</template>
      </el-table-column>
      <el-table-column prop="date" label="注册日期" width="180"></el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button @click=" handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1"></el-pagination>
    <!-- 添加/修改 -->
    <el-dialog :title="'会员'+tip" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <template>
          <p style="text-align:left;padding-left:200px">不填写则不修改密码</p>
        </template>
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
      tip: "编辑",
      dialogFormVisible: false,
      tableData: [],
      rules: {},
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: true,
      },
      formLabelWidth: "200px",
      // 需要传的参数
      forminfo: {
        page: 1,
        size: 2,
      },
    };
  },
  methods: {
    getmember(){
       this.http.get("/api/memberlist", this.forminfo).then((res) => {
      // console.log(res);
      if (res.code == 200) {
        this.tableData = res.list || [];
      } else if (res.code == 403) {
        this.$message(res.msg);
      } else {
        this.$message("访问权限受限，请登录");
      }
    });
    },
    handleSubmit(formName) {
      // 判断状态是否启用
        this.form.status = this.form.status ? "1" : "2";
      this.http.post('/api/memberedit',this.form).then(res => {
        if(res.code == 200){
          this.dialogFormVisible = false;
          this.getmember()
        }
      })
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      let uid = row.uid;
      this.http.get("/api/memberinfo", { uid }).then((res) => {
        if (res.code == 200) {
          let info = res.list;
          info.uid = uid;
          info.status = info.status == 1 ? true : false;
          this.form = info
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        }
      });
    },
  },
  mounted() {
   this.getmember()
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