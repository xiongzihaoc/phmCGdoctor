// pages/message/index.js
import {TimUtils} from "../../utils/TimUtils.js"
const timUtils = new TimUtils();
var app = getApp();
var TxTim = app.getTxTim();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList: []
  },
  // 点击该患者聊天
  goChat:function(e){
    console.log(e);
    timUtils.offReceiveEvent(TxTim.EVENT.MESSAGE_RECEIVED,this.onMessageReceived);
    wx.navigateTo({
      url: '/pages/message/chat/chat?conversationID='+e.currentTarget.dataset.id+"&userId="+e.currentTarget.dataset.userid,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    timUtils.onReceiveEvent(TxTim.EVENT.SDK_NOT_READY,this.onSdkNotReady);
    timUtils.onReceiveEvent(TxTim.EVENT.SDK_READY,this.onTimSdkReady);
    timUtils.onReceiveEvent(TxTim.EVENT.MESSAGE_RECEIVED,this.onMessageReceived);
    timUtils.onReceiveEvent(TxTim.EVENT.CONVERSATION_LIST_UPDATED,this.onConversationListUpdated);
  },
  onMessageReceived(event) {
    console.log('收到新消息 会话列表');
    this.getConsultMsgList();
  },
  onConversationListUpdated(event){
    this.getConsultMsgList();
  },
  onTimSdkReady(event){
    this.getConsultMsgList();
  },
  onSdkNotReady(event){
    timUtils.LoginTim((res)=>{

    });
  },
  getConsultMsgList:function(){
    let that = this;
    timUtils.getConversationList((data)=>{
      console.log(data);
      that.setData({
        messageList:data
      });
    })
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
    this.getConsultMsgList();
    
    // wx.setStorageSync('openId', 'oHaMa4w3GPBzUlb_8m9j9zPlyhqI');
    // let openId = wx.getStorageSync('openId');
    // if (openId) {
    //   wx.switchTab({
    //     url: '/pages/message/index',
    //   })
    // } else {
    //   wx.clearStorage();
    //   wx.navigateTo({
    //     url: '/pages/Authorization/index',
    //   })
    // }
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
    timUtils.offReceiveEvent(TxTim.EVENT.MESSAGE_RECEIVED,this.onMessageReceived);
    timUtils.offReceiveEvent(TxTim.EVENT.MESSAGE_RECEIVED,this.onConversationListUpdated);
    timUtils.offReceiveEvent(TxTim.EVENT.SDK_NOT_READY,this.onSdkNotReady);
    timUtils.offReceiveEvent(TxTim.EVENT.SDK_READY,this.onTimSdkReady);
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