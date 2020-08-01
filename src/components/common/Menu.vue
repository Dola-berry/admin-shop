<template>
    <el-row class="tac">
      <el-col :span="12">
        <h4 style="line-height:60px;color:#fff;background-color:rgb(67, 74, 80)">后台管理系统</h4>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
        <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
            <router-link to='/' slot="title">首页</router-link>
            
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1"><router-link to='/main' active-class='act'>菜单管理</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group >
              <el-menu-item index="2-2"><router-link to='/role' active-class='act'>角色管理</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group >
              <el-menu-item index="2-3"><router-link to='/user' active-class='act'>管理员管理</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1"><router-link to='/category' active-class='act'>商品分类</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-2"><router-link to='/specs' active-class='act'>商品规格</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-3"><router-link to='/goods' active-class='act'>商品管理</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-4"><router-link to='/member' active-class='act'>会员管理</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-5"><router-link to='/banner' active-class='act'>轮播图管理</router-link></el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="3-6"><router-link to='/seckill' active-class='act'>秒杀活动</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
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