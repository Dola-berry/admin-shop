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
        <el-button>编辑</el-button>
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
        <template><p style="text-align:left;padding-left:200px">不填写则不修改密码</p></template>
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
      tip:'编辑',
      dialogFormVisible:true,
      tableData: [],
      rules:{},
      form: {
        uid:'',
        nickname:'',
        phone:'',
        password:'',
        status:true
      },
      formLabelWidth:'200px',
    };
  },
  methods: {
    handleSubmit(formName){}
  },
  mounted() {
    this.http.get("/api/memberlist").then((res) => {
      if (res.code == 200) {
        this.tableData = res.list || [];
      } else if (res.code == 403) {
        this.$message(res.msg);
      } else {
        this.$message("访问权限受限，请登录");
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