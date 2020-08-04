<template>
  <el-row class="tac">
    <el-col :span="12">
      <h4 style="line-height:60px;color:#fff;background-color:rgb(67, 74, 80)">后台管理系统</h4>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
      <!-- :unique-opened = "true" -->
        <el-menu-item index="0">
          <i class="el-icon-s-home"></i>
          <router-link to="/" slot="title">首页</router-link>
        </el-menu-item>
        <el-submenu  v-for="item in list"
        :key="item.id" :index="(item.id).toString()">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item-group v-for="val in item.children"
        :key="val.id"  :index="(val.id).toString()">
            <el-menu-item>
              <router-link :to="val.url" active-class="act">{{val.title}}</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      list: "",
    };
  },
  methods: {},
  mounted() {
    this.list = JSON.parse(sessionStorage.getItem("list")).menus;
    // console.log(this.list);
  },
};
</script>
<style lang="" scoped>
.act {
  color: rgb(255, 208, 75);
}
.el-col {
  width: 100%;
  box-sizing: border-box;
}
.el-menu-vertical-demo {
  width: 200px;
}
.el-submenu .el-menu-item {
  height: 30px;
  line-height: 30px;
}
</style>