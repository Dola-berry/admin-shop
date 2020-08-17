<template>
  <el-main>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>限时秒杀列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="btn">
      <el-button type="primary" @click="handleAdd()">添加</el-button>
      <Main />
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="活动名称" width="180">
        <template slot-scope="scope">{{scope.row.title}}</template>
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
    <el-dialog :title="'限时秒杀'+tip" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="活动名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动日期" :label-width="formLabelWidth" style="text-align:left">
          <el-date-picker
            v-model="value"
            type="datetimerange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="dates"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth" style="text-align:left">
          <el-select
            placeholder="请选择分类"
            style="text-align:left"
            v-model="form.first_cateid"
            @change="firstchange($event)"
          >
            <el-option v-for="item in first" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth" style="text-align:left">
          <el-select
            placeholder="请选择分类"
            style="text-align:left"
            v-model="form.second_cateid"
            @change="secondchange($event)"
          >
            <el-option
              v-for="item in second"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth" style="text-align:left">
          <el-select placeholder="请选择活动区域" v-model="form.goodsid">
            <el-option
              v-for="item in goods"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
      dialogFormVisible: false,
      formLabelWidth: "200px",
      tableData: [],
      first: [],
      second: [],
      goods: [],
      value: [new Date(2020, 10, 10, 10, 10), new Date(2020, 10, 11, 10, 10)],
      pickerOptions: "",
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: true,
      },
      rules: {
        title: { required: true, message: "活动名称不能为空", trigger: "blur" },
      },
    };
  },
  methods: {
    // 活动列表
    getseckill() {
      // 获取限时秒杀数据
      this.http.get("/api/secklist").then((res) => {
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
    handleAdd() {
      this.dialogFormVisible = true;
      this.getFirst();
    },
    // 获取日期时间
    dates() {
      this.form.begintime = new Date(this.value[0]).getTime();
      this.form.endtime = new Date(this.value[1]).getTime();
    },
    // 获取一级分类
    getFirst() {
      this.http.get("/api/catelist?pid=0").then((res) => {
        this.first = res.list;
      });
    },
    // 获取二级分类
    getSecond() {
      this.http
        .get("/api/catelist", { pid: this.form.first_cateid })
        .then((res) => {
          this.second = res.list;
        });
    },
    firstchange(e) {
      this.form.first_cateid = e;
      this.getSecond();
    },
    secondchange(e) {
      this.form.second_cateid = e;
      this.getGoods();
    },
    // 获取商品分类
    getGoods() {
      this.http
        .get("/api/goodslist", {
          fid: this.form.first_cateid,
          sid: this.form.second_cateid,
        })
        .then((res) => {
          this.goods = res.list;
        });
    },

    // 确认提交
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        // 判断编辑还是添加
        let url = this.form.id ? "/api/seckedit" : "/api/seckadd";
        // 判断状态
        this.form.status = this.form.status ? 1 : 2;
        // 添加
        this.http.post(url, this.form).then((res) => {
          if (res.code == 200) {
            // 重新获取菜单
            this.getseckill()
            this.handleReset();
            this.dialogFormVisible = false;
          }else{
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
          }
        });
      });
    },
    // 取消
    handleReset() {
      this.dialogFormVisible = false;
      this.tip = "添加";
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: true,
      };
    },
    // 弹窗关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.handleReset()
        })
        .catch((_) => {});
    },
    // 删除
    handleDelete(row) {
      let id = row.id;
      this.http.post("/api/seckdelete", { id }).then((res) => {
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
      // 显示弹窗对话框
      this.dialogFormVisible = true;
      this.tip = "修改";
      this.getFirst();
      let id = row.id;
      this.http.get("/api/seckinfo", { id }).then((res) => {
        if (res.code == 200) {
          let info = res.list;
          info.id = id;
          info.status = info.status == 1 ? true : false;
          this.form = info;
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "error",
          });
        }
      });
    },
  },
  mounted() {
    this.getseckill()
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