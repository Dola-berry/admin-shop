<template>
  <el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="btn">
      <el-button type="primary" @click="handleAdd()">添加</el-button>
      <Main />
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="轮播图名称" width="180">
        <template slot-scope="scope">{{scope.row.title}}</template>
      </el-table-column>
      <el-table-column label="轮播图片" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.img?('http://localhost:3000'+scope.row.img).replace('undefined',''):scope.row.img" min-width="70" height="70" />
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" size="small" type="success">启用</el-tag>
          <el-tag v-else-if="scope.row.status === 2" size="small" type="info">未启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加/修改 -->
    <el-dialog :title="'轮播图'+tip" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules='rules'>
        <el-form-item label="轮播图名称" :label-width="formLabelWidth" prop='title'>
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="轮播图图片" :label-width="formLabelWidth">
          <el-upload
           action="#"
            list-type="picture-card"
            :on-change="handleChangeFile"
            :file-list="fileList"
            :multiple="false"
            :auto-upload="false"
            ref="prodimg"
            style="text-align:left"
            
          >
          <!-- @opened="handleOpen" -->
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="oldImg?('http://localhost:3000'+file.url).replace('undefined',''):file.url"
                alt
              />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="disabled" class="el-upload-list__item-delete" @click="handleRemove()">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <el-form-item label="状态" style="text-align:left" :label-width="formLabelWidth">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset()">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      fileList: [],
      tip: "添加",
      disabled: true,
      dialogFormVisible: false,
      dialogVisible: false,
      formLabelWidth: "200px",
      dialogImageUrl: "",
      oldImg: true,
      form: {
        title: "",
        img: "",
        status: true,
      },
      rules: {
        title: [
          { required: true, message: "请输入分类标题", trigger: "blur" },
          { min: 2, max: 6, message: "长度在2-6个字", trigger: "blur" },
        ],
    }
    }
  },
  methods: {
    getbanner() {
      // 获取轮播图数据
      this.http.get("/api/bannerlist").then((res) => {
        // 判断是否获取成功
        if (res.code == 200) {
          this.tableData = res.list || [];
        } else if (res.code == 403) {
          this.$message(res.msg);
        } else {
          this.$message("访问权限受限，请登录");
        }
      });
    },
    // 添加按钮
    handleAdd() {
      this.dialogFormVisible = true;
    },
    // 清除图片列表
    handleRemove() {
      this.$(".el-upload-list--picture-card").html("");
    }, 
    // 照片预览图片显示
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 3、选中上传图片后触发行数
    // file:包含被上传图片信息对象
    handleChangeFile(file) {
      this.form.img = file.raw;
    },
    
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        // 判断是编辑操作还是添加
        let url = this.form.id ? '/api/banneredit' :'/api/banneradd';
         // 判断状态是否启用
        this.form.status = this.form.status ? "1" : "2";
        // 1、实例化一个表单对象
        let data = new FormData();
        for(let i in this.form){
          data.append(i,this.form[i])
        }
        this.dialogFormVisible = false
        // 3、提交表单
        this.axios({
          method: "post",
          url,
          data,
          // 改写请求头
          headers: {
            // 上传类型包含文件
            "Content-Type": "multipart/form-data",
            // 身份验证
            Authorization: sessionStorage.getItem("token"),
          },
        }).then(res =>{
           this.handleReset();
          // 重新渲染
          this.getbanner();
        })
      })
    },
    // 取消
    handleReset() {
      this.dialogFormVisible = false;
      this.tip = "添加";
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: true,
      };
       this.handleRemove() 
    },
    // 弹窗关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 删除
    handleDelete(row) {
      let id = row.id;
      this.http.post("/api/bannerdelete", { id }).then((res) => {
        if (res.code == 200) {
          this.tableData = res.list;
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    // 编辑
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.getbanner();
      this.tip = "修改";
      let id = row.id;
      this.http.get("/api/bannerinfo", { id }).then((res) => {
        let info = res.list;
        info.id = id;
        info.status = info.status == 1 ? true : false;
        this.form = info;
        if (info.img) {
          this.fileList = [{ name: "", url: this.imgdomain + info.img }];
        }
      });
    },
  },
  mounted() {
    this.getbanner();
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