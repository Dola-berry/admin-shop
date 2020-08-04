<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-col :gutter="20">
            <el-row :span="16">
              <div class="grid-content bg-purple header bg-purple-dark">商品总览</div>
            </el-row>
            <el-row :span="8">
              <div class="grid-content bg-purple con">
                <el-col :span="6">
                  <span>100</span>
                  <p>已下架</p>
                </el-col>
                <el-col :span="6">
                  <span>400</span>
                  <p>已上架</p>
                </el-col>
                <el-col :span="6">
                  <span>50</span>
                  <p>库存紧张</p>
                </el-col>
                <el-col :span="6">
                  <span>500</span>
                  <p>全部商品</p>
                </el-col>
              </div>
            </el-row>
          </el-col>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-col :gutter="20">
            <el-row :span="16">
              <div class="grid-content bg-purple header bg-purple-dark">用户总览</div>
            </el-row>
              <el-row :span="8">
              <div class="grid-content bg-purple con">
                <el-col :span="6">
                  <span>100</span>
                  <p>今日新增</p>
                </el-col>
                <el-col :span="6">
                  <span>200</span>
                  <p>昨日新增</p>
                </el-col>
                <el-col :span="6">
                  <span>1000</span>
                  <p>本月新增</p>
                </el-col>
                <el-col :span="6">
                  <span>5000</span>
                  <p>会员总数</p>
                </el-col>
              </div>
            </el-row>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <div id="box"></div>
  </el-main>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      dataList:[
          {
            name:"近一周订单销量",
            data: [400, 422, 501, 834, 1290, 1330, 1320],
            type: "line",
          }
        ]
    };
  },
  methods: {
    echart(id) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(id));

      // 指定图表的配置项和数据
      var option = {
        //图表标题
        // title: {
        //   text: "近一周订单数量",
        //   left: "center",
        // },
        // 提示信息
        tooltip:{
          //提示信息的触发时机
          trigger:"axis"
        },
        // 图标
        toolbox:{
          feature:{
            saveAsImage:{}
          }
        },
        //图例 一半多组数据才需要
        legend:{
          data:["近一周订单销量"]
        },
        //x轴
        xAxis: {
          // 分类
          type: "category",
          // 刻度
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          // 是x轴两端否留白
          boundaryGap: false,
        },
        // y轴
        yAxis: {
          type: "value",
        },
        // 当前图表数据
        series: this.dataList,
        // color:"#ff0"
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    this.echart('box');
  },
};
</script>
<style lang="" scoped>
#box {
  width: 800px;
  height: 600px;
  /* border: 1px solid #666; */
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.bg-purple-dark {
  background: #99a9bf;
}
.con {
  height: 100px;
  margin-bottom: 30px;
}
.header {
  height: 50px;
  line-height: 50px;
}
.el-col-6 {
  height: 100px;
  padding: 30px;

}
.el-col-6 span {
  color: red;
}
</style>