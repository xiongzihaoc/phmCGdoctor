// pages/patient/patientDetail/followMore/followMore.js
import { FollowMore } from "./detail_model"
let FollowMoreInfo = new FollowMore();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    name: "",
    userInfoObj: {},
    detailLsit: [],
  },
  // 获取数量
  getFollowInfoNum: function () {
    wx.showLoading({
      title: '加载中...',
    });
    FollowMoreInfo.getFollowInfoNum(this.data.id, (res) => {
      console.log(res);

      this.setData({
        userInfoObj: res.result,
        detailLsit: res.anserInfo
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.name);
    this.setData({
      id: options.id,
      name: options.name
    })

    this.getFollowInfoNum()

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