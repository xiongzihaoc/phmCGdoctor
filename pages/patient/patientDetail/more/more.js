// pages/patient/patientDetail/more/more.js
var utils = require('../../../../utils/util.js')
import { Report } from "./more.modle"
let ReportInfo = new Report();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    reportList: [],
  },
  // 获取报告单信息
  getReportInfo: function () {
    wx.showLoading({
      title: '加载中...',
    });
    ReportInfo.getReportInfo(this.data.id, (res) => {
      console.log(res);
      this.setData({
        reportList: res,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getReportInfo()
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