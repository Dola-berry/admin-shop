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
      <el-table-column label="状态" width="120" v-model="form.status">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" size="small" type="success">启用</el-tag>
          <el-tag v-else-if="scope.row.status === 2" size="small" type="info">未启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelect(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加/修改 -->
    <el-dialog :title="'角色'+tip" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="属性名称" :label-width="formLabelWidth" prop='specsname'>
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
      tip:'添加',
      dialogFormVisible:false,
      rules:{
        specsname:{required:true,message:'请输入名称',trigger:'blur'}
      },
      form:{
        specsname:'',
        attrs:'',
        status:true
      },
      formLabelWidth:'200px',
    };
  },
  mounted() {
   this.getspecs();
  },
  methods:{
    getspecs(){
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
    //添加按钮
    handleAdd(){
      this.dialogFormVisible = true
    },
    // 确认添加
    handleSubmit(formName){
        this.$refs[formName].validate(valid => {
          if(!valid) return;
          // 判断是编辑还是添加
          let url = this.form.id ? '/api/specsedit':'/api/specsadd';
          // 判断状态是否启用
          this.form.status = this.form.status ? 1 : 2;
          this.http.post(url,this.form).then(res => {
            if(res.code == 200) {
              this.$message({
              showClose: true,
              message: res.msg,
              type: "success",
            });
              this.dialogFormVisible = false;
              this.getspecs();
              this.handleReset()
            }else{
              this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
            }
          })
        })
    },
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
    // 修改按钮
    handleEdit(row){
      let id = row.id;
      this.dialogFormVisible = true;
      this.http.get('/api/specsinfo',{id}).then(res => {
        //  console.log(res.list);
        if(res.code == 200){
         let info = res.list[0];
         info.id = id;
         info.attrs = info.attrs.join(',')
         info.status = info.status == 1 ? true : false;
         this.form = info;
        }
      })
    },
    // 删除按钮
    handleDelect(row){
      let id = row.id;
      this.http.post('/api/specsdelete',{id}).then(res => {
        if(res.code == 200) {
          // this.tableData = res.list || [];
          // console.log(this.tableData = res.list);
          this.getspecs()
        }
      })
    },
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