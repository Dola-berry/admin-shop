<template>
<el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
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
      prop="user_id"
      label="用户编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="role"
      label="角色"
      width="180">
    </el-table-column>
    <el-table-column
       prop="uname"
      label="用户名"
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
  :total="1">
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
          user_id: "4449203820488403",
          role:'系统管理员',
          uname:'admin',
          states: <el-Tag type='success'>启用</el-Tag>
        },
        {
          id: 2,
          user_id: "44ewew20488403",
          role:'客服专员',
          uname:'莓莓',
          states: <el-Tag type='success'>启用</el-Tag>
        },
        {
          id: 3,
          user_id: "qef3820488fe403",
          role:'客服专员',
          uname:'哆啦',
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