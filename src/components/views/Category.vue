<template>
  <el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="btn">
      <el-button type="primary">添加</el-button>
      <Main />
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="name" label="分类名称" width="180">
       <template slot-scope="scope">{{scope.row.catename}}</template>
      </el-table-column>
      <el-table-column label="状态" width="120" v-model="form.status">
        <template slot-scope="scope">
          <el-button type="success" g v-show="scope.row.status == true">启用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      form:{
        id:'',
        pid:'',
        catename:"家用电器",
        img:'',
        status:true
      }
    };
  },
  mounted(){
    // 获取商品分类列表
    this.http.get('/api/catelist?istree=1').then(res => {
      if(res.code == 200){
        this.tableData = res.list || []
      }else if(res.code == 403){
        this.$message(res.msg)
      }else{
        this.$message('访问权限受限，请登录')
      }
    }
    )
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