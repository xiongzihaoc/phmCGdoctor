// pages/patient/patientDetail/maintenance/maintenance.js
import { Maint } from "./maintenance.modle"
let MaintInfo = new Maint();
var utils = require('../../../../utils/util.js')
const date = new Date()
const years = []
const months = []
const days = []
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadmoreShow: "false",
    loadmoreType: "end",
    healthTotal: 1,
    healthPageNum: 1,
    healthPageSize: 5,
    maintenanceId: "",
    timeType: 1,
    startTime: "",
    endTime: "",
    // 时间选择器
    searchTimerPopupShow: false,
    // 筛选选择
    closeIconShow: false,
    years,
    months,
    days,
    value: [],
    chooseTime: "",
    MaintList: [],
  },
  // 获取维护详情信息
  getMaintInfo: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
    });
    MaintInfo.getMaintInfo(this.data.healthPageNum, this.data.healthPageSize, this.data.startTime, this.data.endTime, (res) => {
      console.log(res);

      var num = Math.ceil(res.count / that.data.healthPageSize);
      that.setData({
        MaintList: that.data.MaintList.concat(res.data),
        healthTotal: num
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
      MaintList: [],
      chooseTime: "",
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
    });
    this.getMaintInfo()
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
        MaintList: [],
        chooseTime: this.data.startTime + " / " + this.data.endTime,
        searchTimerPopupShow: false,
        healthPageNum: 1,
        healthTotal: 1
      });
      this.getMaintInfo()
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
    console.log(e);

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
    let that = this;
    this.setData({
      maintenanceId: options.id
    })
    let current = utils.getCurrentDate().split("-");
    console.log(current);
    current.forEach(element => {
      console.log(element - 1);
      that.setData({
        value: that.data.value.concat(element - 1)
      });
    });
    this.getMaintInfo();
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
    console.log(333333);

    let that = this;
    if (this.data.healthTotal > this.data.healthPageNum) {
      this.setData({
        loadmoreShow: true,
        loadmoreType: "loading",
        healthPageNum: that.data.healthPageNum + 1
      });
      this.getMaintInfo();
    } else {
      this.setData({
        loadmoreShow: true,
        loadmoreType: "end"
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})