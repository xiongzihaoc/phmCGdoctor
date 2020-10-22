// pages/mine/index.js
import { RegModle } from './index.modle'
let RegModleInfo = new RegModle();
const app = new getApp();

import QR from "../../utils/weapp-qrcode" // 二维码生成器

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qCodeShow: false,
    userName: '',
    headerUrl: "",
    qrcode: '',
    isLogin: false,
    List: [
      { id: 1, name: "个人信息", icon: "iconfont icon-gerenxinxi" },
      { id: 2, name: "二维码", icon: "iconfont icon-ico" },
    ],
  },
  // 跳转个人信息
  bindJumpUserInfo: function (e) {
    wx.navigateTo({
      url: '/pages/mine/userInfo/userInfo',
    })
  },
  // 查看二维码
  viewErweima: function () {
    this.setData({
      qCodeShow: true
    });
  },
  //适配不同屏幕大小的canvas
  getQRCodeSize: function () {
    var size = 0;
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 278; //不同屏幕下QRcode的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      size = width;

    } catch (e) {
      // Do something when catch error
      // console.log("获取设备信息失败"+e);
    }
    return size;
  },
  createQRCode: function (text, size) {
    //调用插件中的draw方法，绘制二维码图片
    let that = this
    // console.log('QRcode: ', text, size)
    let _img = QR.createQrCodeImg(text, {
      size: parseInt(size)
    })
    that.setData({
      'qrcode': _img
    })
  },
  // 保存二维码至本地
  saveImg: function (e) {
    // 64
    console.log(e.currentTarget.dataset.url);
    wx.saveImageToPhotosAlbum({
      success(res) {
        console.log(res);

      },
      error(error) {
        console.log(error);

      },
    })
  },
  // 产品反馈
  bindFeedbackOfProduct: function () {
    wx.navigateTo({
      url: '/pages/mine/feedbackPro/feedbackPro',
    })
  },
  // 反馈历史
  bindFeedbackHistory: function () {
    wx.navigateTo({
      url: '/pages/mine/feedbackHis/feedbackHis',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openId = wx.getStorageSync('openId');
    var that = this;
    let qrcodeSize = that.getQRCodeSize()
    that.createQRCode(openId, qrcodeSize)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  login:function(){
    wx.clearStorage();
    wx.nextTick(() => {
      wx.navigateTo({
        url: '/pages/Authorization/index',
      })
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    let openId = wx.getStorageSync('openId');
    console.log(app);
    if (openId) {
      this.setData({
        isLogin: true
      });
      let qrcodeSize = that.getQRCodeSize()
      that.createQRCode(openId, qrcodeSize)
      wx.showLoading({
        title: '加载中...',
      })
      RegModleInfo.getUserInfo((data) => {
        that.setData({
          userName: data.name,
          headerUrl: data.avatarUrl
        });
      });
    }
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