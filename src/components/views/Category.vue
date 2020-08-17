<template>
  <el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="btn">
      <el-button type="primary" @click="handleAdd()">添加</el-button>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="分类名称" width="180">
        <template slot-scope="scope">{{scope.row.catename}}</template>
      </el-table-column>
      <el-table-column label="商品图片" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.img?('http://localhost:3000'+scope.row.img).replace('undefined',''):scope.row.img" min-width="70" height="70" />
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120" v-model="form.status">
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
    <el-dialog :title="'管理员'+tip" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="菜单名称" :label-width="formLabelWidth" style="text-align:left">
          <el-select v-model="form.pid" placeholder="请选择上级菜单" @change="menuchange($event)">
            <el-option :value="0" label="顶级菜单"></el-option>
            <el-option v-for="item in menus" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth" prop="catename">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 
                    action：自动上传的地址  # 不自动上传
                    list-type：列表类型 照片墙
                    onchange: 选中上传图片触发回调函数 ，参数对象的 raw 属性包含上传图片的信息
                    multiple: 是否上传复数文件
                    auto-upload：是否自动上传

        -->
        <el-form-item label="商品图片" :label-width="formLabelWidth">
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
          <!-- 显示上传图片的缩略图 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

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
      tip: "添加",
      tableData: [],
      fileList: [],
      oldImg: true,
      // 复选框菜单
      menus: "",
      disabled: true,
      dialogFormVisible: false,
      dialogVisible: false,
      formLabelWidth: "200px",
      dialogImageUrl: "",
      // 表单参数
      form: {
        pid: "",
        catename: "",
        img: "",
        status: true,
      },
      // 定义规则
      rules: {
        catename: [
          { required: true, message: "请输入分类标题", trigger: "blur" },
          { min: 2, max: 6, message: "长度在2-6个字", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 获取商品分类列表
    getcate() {
      this.http.get("/api/catelist?istree=1").then((res) => {
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
      this.getMenu();
    },
    // 获取菜单
    getMenu() {
      this.http.get("/api/catelist?pid=0").then((res) => {
        this.menus = res.list;
      });
    },
    // 判断是一级还是二级菜单
    menuchange(e) {
      this.form.pid = e == 0 ? 0 : this.form.pid;
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
    // 确认添加
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        // 判断是编辑还是添加
        let url = this.form.id ? "/api/cateedit" : "/api/cateadd";
        // 判断状态是否启用
        this.form.status = this.form.status ? "1" : "2";
        // 1.实例化一个表单对象
        let data = new FormData();
        // 2.遍历数据对象，向容器中添加需要上传的数据
        for (let i in this.form) {
          data.append(i, this.form[i]);
        }
        // 3.提交数据
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
        }).then((res) => {
          // console.log(res);
          (this.dialogFormVisible = false), this.handleReset();
          // 重新渲染
          this.getcate();
        });
      });
    },
    // 取消
    handleReset() {
      this.dialogFormVisible = false;
      this.tip = "添加";
      this.form = {
        pid: "",
        catename: "",
        img: "",
        status: true,
      };
      this.handleRemove();
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
      this.http.post("/api/catedelete", { id }).then((res) => {
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
      this.getMenu();
      this.tip = "修改";
      let id = row.id;
      this.http.get("/api/cateinfo", { id }).then((res) => {
        if (res.code == 200) {
          let info = res.list;
          info.id = id;
          info.status = info.status == 1 ? true : false;
          this.form = info;
          if (info.img) {
            this.fileList = [{ name: "", url: this.imgdomain + info.img }];
          }else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
        }
        }
      });
    },
  },
  mounted() {
    // 调用分类列表
    this.getcate();
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