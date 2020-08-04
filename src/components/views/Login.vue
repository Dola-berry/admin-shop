<template>
  <div class="con">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"  show-password></el-input>
      </el-form-item>
      <el-form-item class="align">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName){
      //validate 对整个表单进行校验的方法
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.axios.post('/api/userlogin',this.ruleForm).then(res => {
            if(res.data.code == 200){
            sessionStorage.setItem("list",JSON.stringify(res.data.list))
            // 登录成功进行跳转
                this.$router.replace("/index");
            }else{
              this.$message(res.data.msg)
            }
          }).catch((err) => {
            this.$message(err.msg)
          })
        }else{
          return false
        }
      })
    }
  },
};
</script>
<style lang="" scoped>
.con {
  width: 100%;
  height: 100%;
  background: -webkit-linear-gradient(left, #563443, #413a53, #2f3d60);
  position: relative;
}
.demo-ruleForm {
  width: 500px;
  height: 500px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.align {
  text-align: center;
}
.el-button {
  width: 200px;
  margin: auto;
}
.el-form-item {
  margin-right: 50px;
}
</style>