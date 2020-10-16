import {Comm} from "./Common.js"

class TimModle extends Comm{

  constructor(){
    super();
  }

  getUserSign(userName,callback){
    let props = {
      url:"/api/getIdentifier?identifier="+userName,
      contentType:'application/json',
      type:'GET',
      sCallBack: res => {
        wx.hideLoading();
        callback(res);
      },
      eCallBack: err => {
        wx.hideLoading();
        wx.showToast({
          title: '请求出错,请稍后重试!!!',
          icon: 'none'
        })
      }
    };
    this.request(props);
  }
}
export{TimModle};