<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
a {
  color: #fff;
  text-decoration: none;
}
html,body,#app{
  height: 100%;
  box-sizing: border-box;
}
.el-breadcrumb {
  margin: 10px 0;
}
.el-pagination {
  margin: 10px;
  text-align: right;
}
</style>
