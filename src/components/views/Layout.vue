<template>
    <el-container>
      <el-aside width="200px">
        <SideBar />
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown @command="logout">
            <span>admin</span>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <router-view />
      </el-container>
    </el-container>
</template>
<script>
import SideBar from "../common/SideBar";
export default {
  components: {
    SideBar,
  },
  methods:{
    logout(){
      // console.log(1);
      sessionStorage.removeItem("list");
      sessionStorage.removeItem("token");
      this.$router.replace('login')
    }
  }
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
.el-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color:#545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
  overflow: hidden;
}


.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>