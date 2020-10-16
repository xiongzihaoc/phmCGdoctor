// pages/bindNum/bindNum.js
import {BindNumModle} from "./bindNUm_modle.js"
var utils = require("../../utils/util.js");
const bindNumModle = new BindNumModle();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: null,
    code: null,
    timeText: "获取验证码",
  },

  getVarification(){
   
    let that = this;
    if (this.data.timeText!="获取验证码"){
      return;
    }
    if (this.data.phone==null){
      wx.showToast({
        title: '手机号码不能为空',
        icon: "none"
      })
      return;
    }
 
    if(utils.isMobile(this.data.phone)){
        wx.showLoading({
            title: '加载中',
        })
        bindNumModle.sendSms(this.data.phone, (res)=>{
          console.log(res);
          
        wx.hideLoading();
        let num = 60;
        let timer;
        function test() {
          
          that.setData({
            timeText: num + "s"
          })
          if (num == 0) {
            clearInterval(timer);
            that.setData({
              timeText: "获取验证码"
            })
          }
          num--;
        }
        timer = setInterval(test, 1000);
      
      });

    }else{
      wx.showToast({
        title: '手机号码输入有误',
        icon:  "none"
      })
    }
  },
  bindPhoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindCodeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  bindUser:function(){
    wx.showLoading({
      title: '加载中',
    })
    bindNumModle.bindDoctor(this.data.phone,this.data.code,(res)=>{
      console.log(res);
      wx.setStorageSync('isExist', "1");
      wx.setStorageSync('tencentImUser', res.tencentImUser);
        wx.setStorageSync('tencentImPassword', res.tencentImPassword);
      wx.navigateBack({

      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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