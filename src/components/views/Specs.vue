<template>
  <el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品规格</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="btn">
      <el-button type="primary" @click="handleAdd()">添加</el-button>
      <Main />
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="属性名称" width="180">
        <template slot-scope="scope">{{scope.row.specsname}}</template>
      </el-table-column>
      <el-table-column label="属性值" width="280">
        <template slot-scope="scope">
          <el-button type="primary" plain v-for="(item,idx) in scope.row.attrs" :key="idx">{{item}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="states" label="状态" width="80"></el-table-column>
      <el-table-column label="操作" min-width="180">
        <template>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加/修改 -->
    <el-dialog :title="'角色'+tip" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="属性名称" :label-width="formLabelWidth">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性值" :label-width="formLabelWidth" style="text-align:left">
          <el-input v-model="form.attrs" autocomplete="off" style="width:250px"></el-input>
          <el-button type="primary">新增属性值</el-button>
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
      tableData: [],
      tip:'添加',
      dialogFormVisible:false,
      rules:{},
      form:{
        specsname:'',
        attrs:'',
        status:true
      },
      formLabelWidth:'200px',
    };
  },
  mounted() {
    // 获取商品规格
    this.http.get("/api/specslist?size=10&page=1").then((res) => {
      if (res.code == 200) {
        // console.log(res);
        this.tableData = res.list || [];
      } else if (res.code == 403) {
        this.$message(res.msg);
      } else {
        this.$message("访问权限受限，请登录");
      }
    });
  },
  methods:{
    handleSubmit(formName){},
    handleAdd(){
      this.dialogFormVisible = true
    }
  }
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