<template>
<el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员列表</el-breadcrumb-item>
    </el-breadcrumb>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="uname"
      label="昵称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="date"
      label="注册日期"
      width="180">
    </el-table-column>
    <el-table-column label="操作" min-width="180">
        <el-button>编辑</el-button>
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
          uname:'哆啦',
          phone:'19828888912',
          date:'2020-03-28 21:43:56'
          
        },
        {
          id: 2,
          uname:'莓莓',
          phone:'1739450312',
          date:'2020-03-30 20:33:03'
          
        },
        {
          id: 3,
          uname:'布尔',
          phone:'1739450312',
          date:'2020-03-30 20:33:03'
          
        }
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