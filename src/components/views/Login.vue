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
    <el-form-item label="账号" prop="uname">
      <el-input v-model="ruleForm.uname" ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input  v-model="ruleForm.pass"></el-input>
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
        uname: "",
        pwd: ""
      },
      rules: {
        uname: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        pwd:[
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.$router.replace("/")
        } else {
          return false;
        }
      });
    },
  }
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