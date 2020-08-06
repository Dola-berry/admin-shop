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
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="一级分类" width="180">
        <template slot-scope="scope">{{scope.row.firstcatename}}</template>
      </el-table-column>
      <el-table-column label="二级分类" width="180">
        <template slot-scope="scope">{{scope.row.secondcatename}}</template>
      </el-table-column>
      <el-table-column label="商品名称" width="180">
        <template slot-scope="scope">{{scope.row.goodsname}}</template>
      </el-table-column>
      <el-table-column label="销售价" width="180">
        <template slot-scope="scope">{{scope.row.price}}</template>
      </el-table-column>
      <el-table-column label="市场价" width="180">
        <template slot-scope="scope">{{scope.row.market_price}}</template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" size="small" type="success">启用</el-tag>
          <el-tag v-else-if="scope.row.status === 2" size="small">未启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="3"></el-pagination>
    <!-- 添加/修改 -->
    <!-- <el-dialog :title="'用户'+tip" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
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
    </el-dialog> -->
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      tip:'添加',
      dialogFormVisible:false,
      rules:{},
      form:{

      },
      tableData: [],
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        sepcsid: "",
        sepcsattr: "",
        isnew: "",
        ishot: "",
        status: true,
      },
    };
  },
  mounted() {
    this.http.get("/api/goodslist", { size: 10, page: 1 }).then((res) => {
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