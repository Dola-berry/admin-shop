<template>
  <el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="btn">
      <el-button type="primary" @click="handleAdd()">添加</el-button>
      <Main />
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="一级分类" width="180">
        <template slot-scope="scope">{{scope.row.firstcatename}}</template>
      </el-table-column>
      <el-table-column label="二级分类" width="180">
        <template slot-scope="scope">{{scope.row.secondcatename}}</template>
      </el-table-column>
      <el-table-column label="商品名称" width="180">
        <template slot-scope="scope">{{scope.row.goodsname}}</template>
      </el-table-column>
      <el-table-column label="销售价" width="180">
        <template slot-scope="scope">{{scope.row.price}}</template>
      </el-table-column>
      <el-table-column label="市场价" width="180">
        <template slot-scope="scope">{{scope.row.market_price}}</template>
      </el-table-column>
      <el-table-column label="状态" width="120">
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
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pagesize"
      :total="pagecount"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <!-- 商品添加/修改
            opened：弹窗出现的动画效果结束后 执行事件

        
    -->
    <el-dialog
      :title="'商品'+tip"
      :visible.sync="infoVisible"
      @close="handleReset"
      @opened="handleOpen"
      style="text-align:left"
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">
        <el-form-item label="一级分类" prop="first_cateid">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择分类"
            @change="handleCateChange($event)"
          >
            <el-option
              v-for="item in firstarr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="second_cateid">
          <el-select v-model="form.second_cateid" placeholder="请选择分类">
            <el-option
              v-for="item in secondarr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsname">
          <el-input v-model="form.goodsname" placeholder="请输入商品名称"></el-input>
        </el-form-item>

        <!-- 
                    action：自动上传的地址  # 不自动上传
                    list-type：列表类型 照片墙
                    onchange: 选中上传图片触发回调函数 ，参数对象的 raw 属性包含上传图片的信息
                    multiple: 是否上传复数文件
                    auto-upload：是否自动上传

        -->
        <el-form-item label="商品图片">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-change="handleChangeFile"
            :file-list="fileList"
            :multiple="false"
            :auto-upload="false"
            ref="prodimg"
            
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
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
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
        <el-form-item label="商品规格名">
          <el-select
            v-model="form.specsid"
            @change="handleSpecsChange"
            filterable
            placeholder="请选择商品规格名"
          >
            <el-option
              v-for="item in specsarr"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品规格值">
          <el-select v-model="form.specsattr" :multiple="true" placeholder="请选择商品规格值">
            <el-option v-for="item in specsattrs" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售价">
          <el-input v-model="form.price" type="number" :disabled="!form.status"></el-input>
        </el-form-item>
        <el-form-item label="市场价">
          <el-input v-model="form.market_price" type="number" :disabled="!form.status"></el-input>
        </el-form-item>
        <el-form-item label="是否新品">
          <template>
            <el-radio v-model="form.isnew" :label="true">是</el-radio>
            <el-radio v-model="form.isnew" :label="false">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否热卖">
          <template>
            <el-radio v-model="form.ishot" :label="true">是</el-radio>
            <el-radio v-model="form.ishot" :label="false">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="商品描述">
          <!-- 添加容器 -->
          <div id="editor" ref="editorElem" style="text-align:left"></div>
        </el-form-item>
        <el-form-item label="状态">
          <template>
            <el-radio v-model="form.status" :label="true">上架</el-radio>
            <el-radio v-model="form.status" :label="false">下架</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset('form')">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      // 是否有原图
      oldImg: true,
      // 图片地址
      url: "http://localhost:3000",
      // 商品数据
      tableData: [],
      // 每页显示数量
      pagesize: 2,
      // 当前页数
      page: 1,
      // 总页数
      pagecount: 0,
      totle: 20,
      // 对话框显示
      infoVisible: false,
      formLabelWidth: "120px",
      // 对话框标题文本
      tip: "添加",
      // 富文本编辑器
      editor: null,
      // 表单的数据
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        img: "",
        price: "",
        market_price: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: false,
        ishot: false,
        status: true,
      },
      firstarr: [],
      secondarr: [],
      specsarr: [],
      specsattrs: [],
      rules: {
        cateid: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
        title: [
          { required: true, message: "请输入商品标题", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      // 上传图片地址信息
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: [],
    };
  },
  // 挂载后开始渲染
  mounted() {
    this.getCount();
    this.getPage();
  },
  methods: {
    //获取总数
    getCount() {
      this.http.get("/api/goodscount").then((res) => {
        
      });
    },
    // 获取页数
    getPage() {
      this.http.get("/api/goodslist").then((res) => {
        
        this.tableData = res.list || [];
        this.getCount();
      });
    },
    //设置分类
    getCategory(pid = 0) {
      this.http.get("/api/catelist", { pid: pid }).then((res) => {
        if (pid === 0) {
          this.firstarr = res.list;
        } else {
          this.secondarr = res.list;
        }
      });
    },
    //获取特性列表
    getSpecs() {
      this.http.get("/api/specslist").then((res) => {
        this.specsarr = res.list;
        this.specsarr.map((d) => {
          if (d.id === this.form.specsid) {
            this.specsattrs = d.attrs;
          }
        });
      });
    },
    // 切换分类
    handleCateChange(e) {
      this.secondarr = [];
      this.getCategory(e);
    },
    // 添加操作
    handleAdd() {
      this.getCategory();
      this.getSpecs();
      this.$(".el-upload-list--picture-card").html("");
      this.infoVisible = true;
    },
    // 编辑操作
    handleEdit(row) {
      this.infoVisible = true;
      let id = row.id;
      this.tip = "修改";
      this.http.get("/api/goodsinfo", { id }).then((res) => {
        let info = res.list;
        this.getCategory();
        if (info.first_cateid) {
          this.getCategory(info.first_cateid);
        }
        info.id = id;
        info.isnew = info.isnew == 1 ? true : false;
        info.ishot = info.ishot == 1 ? true : false;
        info.status = info.status == 1 ? true : false;
        this.form = info;
        this.getSpecs();
        this.form.specsattr = info.specsattr.split(",");
        if (info.img) {
          this.fileList = [{ name: "", url: this.imgdomain + info.img }];
        }
      });
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return;
        }
        this.form.isnew = this.form.isnew ? 1 : 2;
        this.form.ishot = this.form.ishot ? 1 : 2;
        this.form.status = this.form.status ? 1 : 2;
        this.form.specsattr = this.form.specsattr
          ? this.form.specsattr.join(",")
          : "";
        let url = this.form.id ? "/api/goodsedit" : "/api/goodsadd";

        // 1 实例化表单对象，被上上传的数据的容器
        var data = new FormData();
        for (let i in this.form) {
          // 但被遍历的属性 是 img ,说明 需要添加上传文件的形象
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
          res = res.data;
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success",
            });
            this.infoVisible = false;
            this.getPage();
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
          }
        });
      });
    },
    // 重置
    handleReset() {
      this.infoVisible = false;
      this.tip = "添加";
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        img: "",
        price: "",
        market_price: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: false,
        ishot: false,
        status: true,
      };
      // 清空预览图片列表
      this.$(".el-upload-list--picture-card").html("");
    },
    // 对话框打开事件
    handleOpen() {
      this.form.id ? (this.oldImg = true) : (this.oldImg = false);
       this.$("#editor").empty();
      // 实例化
      this.editor = new E("#editor");

      // 用户在文本框中输入 编辑 触发事件
      // html-》 用户输入的html 结构
      this.editor.customConfig.onchange = (html) => {
        this.form.description = html;
      };
      // 创建
      this.editor.create();

      //显示商品描述
      this.editor.txt.html(this.form.description);
    },
    // 删除事件
    handleDelete(row) {
        let id = row.id;
      this.http.post("/api/goodsdelete", { id }).then((res) => {
        if (res.code != 200) {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        } else {
        //   this.tableData = res.list;
        this.getPage()
        }
      });
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
    // 选中上传图片后触发行数
    // file:包含被上传图片信息对象
    handleChangeFile(file) {
      this.form.img = file.raw;
    },
    //分页切换
    handleCurrentChange: function (currentPage) {
      this.page = currentPage;
      this.getPage();
    },
    // 分类切换事件
    handleSpecsChange() {
      // 获取对应类别
      var nowselect = this.specsarr.find((d, i) => {
        return d.id === this.form.specsid;
      });
      this.form.specsid = nowselect.id;
      this.specsattrs = nowselect.attrs;
    },
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