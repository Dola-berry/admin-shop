<template>
      <el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
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
    <el-table-column prop="name" label="名称" width="180"></el-table-column>
    <el-table-column prop="icon" label="图标">
        <template slot-scope="item"><i :class="item.row.icon"></i></template>
    </el-table-column>
    <el-table-column prop="type" label="类型"></el-table-column>
    <el-table-column prop="sort" label="排序" width="60"></el-table-column>
    <el-table-column prop="navUrl" label="菜单URL"></el-table-column>
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
          name: "系统管理",
          icon: 'el-icon-s-tools',
          type: <el-Tag>目录</el-Tag>,
          sort: 0,
          navUrl: "",
          children: [
            {
              id: 11,
              name: "菜单管理",
              icon: "",
              type: <el-Tag type='success'>菜单</el-Tag>,
              sort: "",
              navUrl: "/menu",
            },
            {
              id: 12,
              name: "角色管理",
              icon: "",
              type: <el-Tag type='success'>菜单</el-Tag>,
              sort: "",
              navUrl: "/role",
            },
            {
              id: 13,
              name: "管理员管理",
              icon: "",
              type: <el-Tag type='success'>菜单</el-Tag>,
              sort: "",
              navUrl: "/user",
            },
          ],
        },
        {
          id: 2,
          name: "商城管理",
          icon: "el-icon-user-solid",
          type: <el-Tag>目录</el-Tag>,
          sort: 1,
          navUrl: "",
          children: [
            {
              id: 21,
              name: "商品分类",
              icon: "",
              type: <el-Tag type='success'>菜单</el-Tag>,
              sort: "",
              navUrl: "/category",
            },
            {
              id: 22,
              name: "商品规格",
              icon: "",
              type: <el-Tag type='success'>菜单</el-Tag>,
              sort: "",
              navUrl: "/specs",
            },
            {
              id: 23,
              name: "商品管理",
              icon: "",
              type: <el-Tag type='success'>菜单</el-Tag>,
              sort: "",
              navUrl: "/goods",
            },
            {
              id: 24,
              name: "会员管理",
              icon: "",
              type: <el-Tag type='success'>菜单</el-Tag>,
              sort: "",
              navUrl: "/member",
            },
            {
              id: 25,
              name: "轮播图管理",
              icon: "",
              type: <el-Tag type='success'>菜单</el-Tag>,
              sort: "",
              navUrl: "/banner",
            },
            {
              id: 26,
              name: "秒杀活动",
              icon: "",
              type: <el-Tag type='success'>菜单</el-Tag>,
              sort: "",
              navUrl: "/seckill",
            }
          ],
        },
      ],
    };
  },
  methods: {
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