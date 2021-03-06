// pages/patient/patientDetail/history/index.js

import {
  Matter
} from "./dietetic.modle"
let MatterInfo = new Matter();
var utils = require("../../../../utils/util.js");
const date = new Date()
const years = []
const months = []
const days = []
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = '0' + i
  }
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = '0' + i
  }
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadmoreShow: "false",
    loadmoreType: "end",
    timeType: 1,
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    // 时间选择器
    searchTimerPopupShow: false,
    // 筛选选择
    closeIconShow: false,
    years,
    months,
    days,
    value: [],
    chooseTime: "",
    historyQues: [],
  },
  // 获取问题信息
  getMatterInfo: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
    });
    MatterInfo.getMatterInfo(this.data.startTime, this.data.endTime, (res) => {
      let historyQues = res.data
      that.setData({
        historyQues: historyQues
      })
    });
  },
  // 预览图片
  preViewImage: function (e) {
    var url = utils.getDataSet(e, "url");
    // console.log(url);
    var urls = [];
    urls.push(url);
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  selectTimer: function () {
    if (this.data.startTime == '') {
      this.setData({
        startTime: utils.getCurrentDate(),
      });
      console.log(this.data.startTime);

    }
    if (this.data.endTime == '') {
      this.setData({
        endTime: utils.getCurrentDate(),
      });
    }
    this.setData({
      searchTimerPopupShow: true
    });
  },
  // 清除所选时间
  closeIcon: function (e) {
    this.setData({
      closeIconShow: false,
      historyQues: [],
      chooseTime: "",
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
    });
    this.getMatterInfo()
  },
  done: function () {
    // console.log(this.data.startTime);
    var start = new Date(this.data.startTime).getTime()
    var end = new Date(this.data.endTime).getTime()
    if (start > end) {
      wx.showToast({
        title: '起始时间不能大于结束时间',
        icon: "none"
      })
      return
    } else {
      this.setData({
        closeIconShow: true,
        historyQues: [],
        chooseTime: this.data.startTime + " / " + this.data.endTime,
        searchTimerPopupShow: false,
      });
      this.getMatterInfo()
    }
  },
  clear: function () {
    this.setData({
      searchTimerPopupShow: false
    });
  },
  changeTimerType: function (e) {
    var type = utils.getDataSet(e, "type");
    this.setData({
      timeType: type
    });
  },
  bindChange(e) {
    let that = this;
    const val = e.detail.value;
    if (this.data.timeType == 1) {
      this.setData({
        startTime: that.data.years[val[0]] + "-" + that.data.months[val[1]] + "-" + that.data.days[val[2]],
        startDate: that.data.years[val[0]] + "-" + that.data.months[val[1]] + "-" + that.data.days[val[2]]
      });
    } else {
      this.setData({
        endTime: that.data.years[val[0]] + "-" + that.data.months[val[1]] + "-" + that.data.days[val[2]],
        endDate: that.data.years[val[0]] + "-" + that.data.months[val[1]] + "-" + that.data.days[val[2]]
      });
    }
    console.log(this.data.startTime);
    console.log(this.data.endTime);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    let that = this;
    let current = utils.getCurrentDate().split("-");
    console.log(current);
    current.forEach(element => {
      console.log(element - 1);
      that.setData({
        value: that.data.value.concat(element - 1)
      });
    });
    this.getMatterInfo();
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