import { Maint } from "./feedbackDay.modle"
let MaintInfo = new Maint();
var utils = require("../../../../utils/util");
import * as echarts from '../../../../ec-canvas/echarts';

var dataList = [];
var k = 0;
var Chart = null;


const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [
      { id: 1, name: "排出量" },
      { id: 2, name: "导管下行" },
    ],
    navNum: 1,
    feedbackRecordList: [],
    outputList: [],
    ec: {
      // onInit: initChart,
      lazyLoad: true
    },
  },


  //初始化图表
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      // Chart.setOption(this.getOption());
      this.setOption(Chart);
      console.log(222);

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  setOption: function (Chart) {
    console.log(333);
    Chart.clear();  // 清除
    Chart.setOption(this.getOption());  //获取新数据
    console.log(444);
  },
  getOption: function () {
    console.log(111);

    let that = this
    dataList = this.data.outputList
    let navNum = that.data.navNum
    let infoData = []
    console.log(dataList);

    if (navNum == 1) {
      infoData = dataList.map(item => item.output)
    } else {
      infoData = dataList.map(item => item.ductHight)
    }
    // 指定图表的配置项和数据
    var option = {
      xAxis: {
        type: 'category',
        data: dataList.map(item => (item.createTime).slice(5)),
        axisLabel: {
          interval: 0,
          textStyle: {   //textStyle里面写x轴下的字体的样式
            color: '#a8a8a8',
            fontSize: 13
          }
        },
        axisLine: {
          show: true,  //这里的show用于设置是否显示x轴那一条线 默认为true
          lineStyle: { //lineStyle里面写x轴那一条线的样式
            color: '#a8a8a8',
            width: 1,    //轴线的粗细 我写的是2 最小为0，值为0的时候线隐藏
          }
        },
        axisTick: {
          show: false,  //是否显示网状线 默认为true
          alignWithLabel: true
        },
      },
      yAxis: {
        type: 'value',
        scale: true,
        axisLabel: {
          interval: 0,
          textStyle: {   //textStyle里面写x轴下的字体的样式
            color: '#a8a8a8',
            fontSize: 13
          },
          formatter: function (value) {
            if (navNum == 1) {
              return value + "L";
            } else {
              return value + "cm";
            }
          }
        },
        axisLine: {
          show: false,  //这里的show用于设置是否显示x轴那一条线 默认为true
          // lineStyle: { //lineStyle里面写x轴那一条线的样式
          //   color: '#a8a8a8',
          //   width: 2,    //轴线的粗细 我写的是2 最小为0，值为0的时候线隐藏
          // }
        },
        axisTick: {
          show: false,  //是否显示网状线 默认为true
          alignWithLabel: true
        },
      },
      dataZoom: [{
        type: 'inside',
        show: true,
        startValue: 0,
        endValue: 5,
      }],
      series: [{
        data: infoData,
        color: '#FEA855',
        type: 'line',
        smooth: true
      }],
      tooltip: {
        trigger: 'axis',
        confine: true,
        axisPointer: {
          type: 'line',
          lineStyle: {
            type: 'dashed',
            color: '#5FC0BC',
          },

        },
        backgroundColor: '#FEA855',
        textStyle: {
          color: '#fff',
          fontSize: '10',
          lineHight: '10'
        },
        formatter: function (params, ticket, callback) {
          var tipString = ''
          if (navNum == 1) {
            tipString = `${params[0].value} L`;
          } else {
            tipString = `${params[0].value} cm`;
          }
          return tipString;
        }
      },
    }
    return option;
  },

  bindNav: function (e) {
    let that = this
    that.setData({
      navNum: e.currentTarget.dataset.id
    })
    this.init_echarts()
  },
  // 获取每日反馈信息
  getDayfeedbackInfo: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
    });
    MaintInfo.getDayfeedbackInfo(this.data.startTime, this.data.endTime, (res) => {
      let outputArr = res.data
      console.log(outputArr);

      that.setData({
        outputList: outputArr
      })
      this.init_echarts(); //初始化图表
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.echartsComponnet = this.selectComponent('#mychart');
    this.getDayfeedbackInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})