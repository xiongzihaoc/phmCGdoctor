import { Comm } from "../../utils/Common.js"
class BindNumModle extends Comm{
  constructor(){
    super();
  }
  sendSms(phone,callback){
    let props = {
      url: "/api/sendPhoneCode",
      contentType: 'application/json',
      data: {
        phone: phone,
      },
      sCallBack: res => {
        wx.hideLoading();
        callback(res.data);
      },
      eCallBack: err => {
        wx.hideLoading();
        wx.showToast({
          title: '请求出错,请稍后重试!!!',
          icon: 'none'
        })
      }
    }
    this.request(props);
  }

  bindDoctor(phone,code,callback){
    let props = {
      url: "/api/bindAccount",
      contentType: 'application/json',
      data: {
        phone: phone,
        authCode:code,
        openId:wx.getStorageSync('openId')
      },
      sCallBack: res => {
        wx.hideLoading();
        callback(res.data);
      },
      eCallBack: err => {
        wx.hideLoading();
        wx.showToast({
          title: '请求出错,请稍后重试!!!',
          icon: 'none'
        })
      }
    }
    this.request(props);
  }
}
export{BindNumModle}