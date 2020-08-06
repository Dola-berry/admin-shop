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
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="name" label="分类名称" width="180">
        <template slot-scope="scope">{{scope.row.catename}}</template>
      </el-table-column>
      <el-table-column label="状态" width="120" v-model="form.status">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" size="small" type="success">启用</el-tag>
          <el-tag v-else-if="scope.row.status === 2" size="small">未启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加/修改 -->
    <el-dialog :title="'管理员'+tip" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth" style="text-align:left">
          <el-select v-model="form.pid" placeholder="请选择上级菜单">
            <el-option value="0" label="顶级菜单"></el-option>
            <!-- <el-option v-for="item in menus" :key="item.id" :label="item.title" :value="item.id"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
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

        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <el-form-item label="状态" style="text-align:left" :label-width="formLabelWidth">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
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
      fileList:[],
      imageUrl: "",
      dialogFormVisible: false,
      dialogVisible: false,
      formLabelWidth: "200px",
      dialogImageUrl:'',
      form: {
        id: "",
        pid: "",
        catename: "家用电器",
        img: "",
        status: true,
      },
    };
  },
  methods: {
    handleRemove(file){},
    handlePictureCardPreview(file){},
    handleChangeFile(file) {
      console.log(file);
      this.form.img = file.raw;
    },
    handleAdd() {
      this.dialogFormVisible = true;
    },
  },
  mounted() {
    // 获取商品分类列表
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