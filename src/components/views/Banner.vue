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
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      label="轮播图名称"
      width="180">
      <template slot-scope="scope">{{scope.row.title}}</template>
    </el-table-column>
    <el-table-column label="状态" width='80'>
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
    <el-dialog :title="'轮播图'+tip" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="轮播图名称" :label-width="formLabelWidth">
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
        </el-form-item>
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
      tip:'添加',
      dialogFormVisible:false,
      tableData: [],
      formLabelWidth:'200px',
      dialogVisible:false,
      dialogImageUrl:'',
      form:{
        title:'',
        img:'',
        status:true
      },
      fileList:''
    };
  },
  methods:{
    handleChangeFile(){},
    handlePictureCardPreview(file){},
    handleRemove(file){},
    handleSubmit(formName){},
    handleAdd(){
      this.dialogFormVisible=true
    }
  },
  mounted(){
    // 获取轮播图数据
    this.http.get('/api/bannerlist').then(res =>{
      // 判断是否获取成功
      if(res.code == 200){
        this.tableData = res.list || []
      }else if(res.code == 403){
        this.$message(res.msg)
      }else{
        this.$message('访问权限受限，请登录')
      }
    })
  }
}
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