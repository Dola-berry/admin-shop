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
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="states" label="状态" width="80"></el-table-column>
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
      tableData: [
        {
          id: 1,
          name: "家用电器",
          states: <el-Tag type="success">启用</el-Tag>,
          children: [
            {
              id: 11,
              name: "家用电器1111",
            },
            {
              id: 12,
              name: "家用电器1111222",
            },
            {
              id: 13,
              name: "家用电器1111333",
            },
          ],
        },
        {
          id: 2,
          name: "手机通讯",
          states: <el-Tag type="success">启用</el-Tag>,
          children: [
            {
              id: 21,
              name: "手机通讯11",
            },
            {
              id: 22,
              name: "手机通讯222",
            },
          ],
        },
        {
          id: 3,
          name: "电脑办公",
          states: <el-Tag type="success">启用</el-Tag>,
          children: [
            {
              id: 31,
              name: "电脑办公11",
            },
            {
              id: 32,
              name: "电脑办公222",
            },
          ],
        },
        {
          id: 4,
          name: "家居",
          states: <el-Tag type="success">启用</el-Tag>,
        },
        {
          id: 5,
          name: "服饰",
          states: <el-Tag type="success">启用</el-Tag>,
        },
      ],
    };
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