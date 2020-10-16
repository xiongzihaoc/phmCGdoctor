//app.js
var TxTim = require("tim-wx-sdk");
var TxCos = require("cos-wx-sdk-v5");
var tim;
App({
  data: {
    iMdata:{},
    consultMsg:[],
    consultMsgSync:false,
    width:0,
  },
  getTim:function(){
    return tim;
  },
  getTxTim:function(){
    return TxTim;
  },
  setJGJim:function(newjim){
    jim = newjim;
    console.log("appJim:");
    console.log(jim);
  },
  onLaunch: function () {
    this.getSystemInfo();
    this.createTim();
  },
  createTim:function(){
    let options = {
      SDKAppID: 1400413553 // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
    };
    // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
    tim = TxTim.create(options); // SDK 实例通常用 tim 表示

    // 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
    tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
    // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用

    // 注册 COS SDK 插件
    tim.registerPlugin({'cos-wx-sdk': TxCos});
  },
  getSystemInfo:function () {
    let that = this;
    wx.getSystemInfo({  
      success: function (res) {  
        var imageWidth = res.windowWidth/2;
        that.data.width = imageWidth;
        console.log(imageWidth+""+res.windowWidth+""+that.data.width);
      }
    });  
  }

})