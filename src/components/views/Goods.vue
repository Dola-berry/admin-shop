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
    border
    style="width: 100%">
    <el-table-column
       prop="firstCate"
      label="一级分类"
      width="180">
    </el-table-column>
    <el-table-column
       prop="secondCate"
      label="二级分类"
      width="180">
    </el-table-column>
    <el-table-column
       prop="goods"
      label="商品名称"
      width="180">
    </el-table-column>
    <el-table-column
       prop="p_sale"
      label="销售价"
      width="180">
    </el-table-column><el-table-column
       prop="price"
      label="市场价"
      width="180">
    </el-table-column>
    <el-table-column prop="states" label="状态" width='80'></el-table-column>
    <el-table-column label="操作" min-width="180">
      <template>
        <el-button size="mini">编辑</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  :total="3">
</el-pagination>
  </el-main>
</template>

<script>
export default {
    data() {
    return {
      tableData: [
        {
          id: 1,
          firstCate:'手机通讯',
          secondCate:'手机',
          goods:'小米10',
          p_sale:'3999',
          price:'3999',
          states: <el-Tag type='success'>启用</el-Tag>
        },
        {
          id: 2,
          firstCate:'电脑办公',
          secondCate:'笔记本',
          goods:'联想小新',
          p_sale:'4499',
          price:'4699',
          states: <el-Tag type='success'>启用</el-Tag>
        },
      ],
    };
  },
}
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