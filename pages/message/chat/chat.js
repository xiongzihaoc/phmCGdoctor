// consultdoctor/pages/consult.js
import {TimUtils} from "../../../utils/TimUtils.js"
var utils = require("../../../utils/util.js");
const timUtils = new TimUtils();
const app = new getApp();
var TxTim = app.getTxTim();
var recorderManager;
var innerAudioContext = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    consultList:[],
    conversationID:'',
    nextReqMessageID:'',
    isCompleted:false,
    txtMsg:'',
    msgList:[],
    jgUserName:'',
    scrollTopItem:'',
    scrollHeight:0,
    isVoice:false,
    isSendBtn:false,
    scrollrefresher:false,
    status: 0,
    cancel:false,
    tips: ['按住 说话', '松开 结束', '取消 发送'],
    state: {
      'normal': 0,
      'pressed': 1,
      'cancel': 2
    },
    isStartVoice:false,
    voiceStartImgIndex:1,
    playingVoiceIndex:-1,
    headerUrl:'',
    userHeaderUrl:''
  },
  preViewImg:function(e){
    var url = utils.getDataSet(e,"url");
    var urls=[];
    urls.push(url); 
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  bindMsgClick:function(e){
    console.log(e);
    
  },
  bindSendMsgInput:function(e){
    this.setData({
      txtMsg: e.detail.value
    });
    if(this.data.txtMsg.length > 0){
      this.setData({
        isSendBtn:true
      });
    }else {
      this.setData({
        isSendBtn:false
      });
    }
    console.log(this.data.txtMsg.length);
  },
  sendTxtMsg:function () {
    let that = this;
    if(!this.data.txtMsg){
      wx.showToast({
        title: '发送内容不能为空',
        icon:"none"
      });
      return;
    }
    timUtils.createTxtMsg(this.data.userId,this.data.txtMsg,(data)=>{
      console.log(data);
         that.setData({
            txtMsg:'',
            msgList:that.data.msgList.concat(data.data.message),
            isSendBtn:false
          });
          that.scrollTopBox();
    });
  },
  sendImgMsg:function () {
    let that = this;
    timUtils.createImageMsg(this.data.userId,(data)=>{
      var imageMsg = data.data.message;
      var imageArry = imageMsg.payload.imageInfoArray;
      for(var i=0;i<imageArry.length;i++){
        var image = imageArry[i];
        if(image.sizeType == 1){
          var imageSize = utils.imageZoomHeightUtil(app.data.width,image.width,image.height);
          imageMsg.payload.width=imageSize.width;
          imageMsg.payload.height = imageSize.height;
          imageMsg.payload.url = image.url;
        }
      }
      that.setData({
         txtMsg:'',
         msgList:that.data.msgList.concat(imageMsg)
       });
       that.scrollTopBox();
    });
  },
  onMessageReceived(event){
    let that = this;
    if(event != null && event.data.length > 0){
      var message = event.data[0];
      var fromUser = message.from;
      if(fromUser == this.data.userId){
        if(message.type == "TIMImageElem"){
          var imageArry = message.payload.imageInfoArray;
          for(var j=0;j<imageArry.length;j++){
            var image = imageArry[j];
            if(image.sizeType == 1){
              var imageSize = utils.imageZoomHeightUtil(app.data.width,image.width,image.height);
              message.payload.width=imageSize.width;
              message.payload.height = imageSize.height;
              message.payload.url = image.url;
            }
          }
        } else if(message.type == "TIMSoundElem"){
          var audioLength = message.payload.second;
          message.payload.width=200+5*audioLength;
        }
        // var msgList = this.data.msgList;
        // msgList.push(message);
        this.setData({
          msgList:that.data.msgList.concat(message)
        });
        this.scrollTopBox();
        timUtils.setMessageRead(this.data.conversationID,(data)=>{
          console.log("设置消息已读");
        });
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("用户ID");
    console.log(options.userId);
    recorderManager = wx.getRecorderManager()
    recorderManager.onStop(this.onAudioReviceOnstop);
    timUtils.onReceiveEvent(TxTim.EVENT.MESSAGE_RECEIVED,this.onMessageReceived);
    let then = this;
    this.setData({
      conversationID:options.conversationID,
      userId:options.userId
    });
    timUtils.getTimUserInfo((res)=>{
      console.log(res);
      then.setData({
        headerUrl:res.avatar
      });
    });
    var userList=[];
    userList.push(this.data.userId);
    timUtils.getUserProfile(userList,(res)=>{
      then.setData({
        userHeaderUrl:res[0].avatar
      });
      console.log(that.data.userHeaderUrl);
      
    });
    timUtils.setMessageRead(this.data.conversationID,(data)=>{
      console.log("设置消息已读");
      console.log(data);
    });
    timUtils.getMessageList(this.data.conversationID,(data,nextReqMessageID,isCompleted)=>{
      console.log("消息列表");
      console.log(data);
      then.setData({
        nextReqMessageID:nextReqMessageID,
        isCompleted:isCompleted
      });
      then.initData(data,false);
    });
  },
  getMoreMsgList:function(){
    let then = this;
    console.log("加载更多消息内容");
    if(!this.data.isCompleted){
      timUtils.getMessageListMore(then.data.conversationID,this.data.nextReqMessageID,(data,nextReqMessageID,isCompleted)=>{
        then.setData({
          nextReqMessageID:nextReqMessageID,
          isCompleted:isCompleted,
          scrollrefresher:true
        });
        then.initData(data,true);
      });
    } else {
      this.setData({
        scrollrefresher:true
      });
    }
    
  },
  initData:function(msgList,isNext){
    let then = this;
    var messageList = msgList;
    for(var i=0;i<messageList.length;i++){
      var msg = messageList[i];
      if(msg.type == "TIMImageElem"){
        var imageArry = msg.payload.imageInfoArray;
        for(var j=0;j<imageArry.length;j++){
          var image = imageArry[j];
          if(image.sizeType == 1){
            var imageSize = utils.imageZoomHeightUtil(app.data.width,image.width,image.height);
            msg.payload.width=imageSize.width;
            msg.payload.height = imageSize.height;
            msg.payload.url = image.url;
          }
        }
      } else if(msg.type == "TIMSoundElem"){
        var audioLength = msg.payload.second;
        msg.payload.width=200+5*audioLength;
      }
    }
    if(!isNext) {
      this.setData({
        msgList:messageList
      });
      this.scrollTopBox();
    }else {
      var list = this.data.msgList;
      for(var i=messageList.length-1;i>=0;i--){
        list.unshift(messageList[i]);
      }
      this.setData({
        msgList:list
      });
      this.setData({
        scrollTopItem: `item${messageList.length-1}`
      });
    }
    
  },
  scrollTopBox: function(){
    let that = this;
    that.setData({
      scrollTopItem: `item${that.data.msgList.length-1}`
    });
  },
  bindScroll:function(e){
    console.log(e);
  },
  checkSendVoice:function(){
    this.setData({
      isVoice:true,
      isSendBtn:false
    });
   
  },
  checkSendTxt:function(){
    this.setData({
      isVoice:false
    });
    if(this.data.txtMsg.length>0){
      this.setData({
        isSendBtn:true
      });
    }
  },
  startVoice:function(){
    // 录音部分参数
    const recordOptions = {
      duration: 60000, // 录音的时长，单位 ms，最大值 600000（10 分钟）
      sampleRate: 44100, // 采样率
      numberOfChannels: 1, // 录音通道数
      encodeBitRate: 192000, // 编码码率
      format: 'aac' // 音频格式，选择此格式创建的音频消息，可以在即时通信 IM 全平台（Android、iOS、微信小程序和Web）互通
    };
    // 2.1 监听录音错误事件
    recorderManager.onError(function(errMsg) {
      console.log("开始错误");
      console.warn('recorder error:', errMsg);
    });
    console.log("开始录音");
    // recorderManager.onStop(function(res){
    //   console.log('recorder stop', res);
 
    // });
    // 
    recorderManager.start(recordOptions);
  },
  onAudioReviceOnstop(res){
    let that = this;
    console.log("监听录音结束");
    console.log(res.tempFilePath);
    if(!this.data.cancel){
      timUtils.createAudioMsg(that.data.userId,res,(data)=>{
        console.log(data);
        var msg = data.data.message;
        var audioLength = msg.payload.second;
        msg.payload.width=200+5*audioLength;
        that.setData({
          msgList:that.data.msgList.concat(msg),
          cancel:false,
          status:0
        });
        that.scrollTopBox();
      });
    }
  },
  touchStart: function (e) {
    let that = this;
    // 触摸开始
    var startY = e.touches[0].clientY;
    // 记录初始Y值
    this.setData({
      startY: startY,
      status: that.data.state.pressed
    });
  },
  touchMove: function (e) {
    let that = this;
    // 触摸移动
    var movedY = e.touches[0].clientY;
    var distance = this.data.startY - movedY;
    // console.log(distance);
    // 距离超过50，取消发送
    this.setData({
      status: distance > 50 ? that.data.state.cancel : that.data.state.pressed
    });
  },
  touchEnd: function (e) {
    console.log("结束录音");
    let that = this;
    // 触摸结束
    var endY = e.changedTouches[0].clientY;
    var distance = this.data.startY - endY;
    // console.log(distance);
    // 距离超过50，取消发送
    this.setData({
      cancel: distance > 50 ? true : false,
      status: that.data.state.normal
    });
    // 不论如何，都结束录音
    this.stopAudio();
  },
  stopAudio:function(){
    recorderManager.stop();
   
  },
  startAudio:function(e){
    innerAudioContext.destroy();
    innerAudioContext = wx.createInnerAudioContext();
    let that = this;
    console.log(e);
    var playingVoiceIndex = utils.getDataSet(e,"index");
    var url = utils.getDataSet(e,"url");
    innerAudioContext.src=url;
    innerAudioContext.play();
    innerAudioContext.onError(function callback(){
      console.log("播放错误");
    });
    innerAudioContext.onPlay(function callback(){
      console.log("开始播放");
      var i = 1;
      that.setData({
        isStartVoice:true,
        playingVoiceIndex:playingVoiceIndex
      });
      that.timer = setInterval(function () {
        i++;
        i = i % 4;
        that.setData({
          voiceStartImgIndex: i
        })
      }, 200);
   
    });
    innerAudioContext.onEnded(function callback(){
      that.setData({
        isStartVoice:false,
        voiceStartImgIndex:1,
        playingVoiceIndex:-1
      });
    });
    innerAudioContext.offEnded(function callback(){
      that.setData({
        isStartVoice:false,
        voiceStartImgIndex:1,
        playingVoiceIndex:-1
      });
    });
   
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
    console.log("页面卸载");
    timUtils.offReceiveEvent(TxTim.EVENT.MESSAGE_RECEIVED,this.onMessageReceived)
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