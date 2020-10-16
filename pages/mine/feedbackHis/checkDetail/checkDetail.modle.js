import { Comm } from "../../../../utils/Common"
class Patient extends Comm {
  constructor() {
    super();
  }
  getFeedbackList(id, callback) {
    let openId = wx.getStorageSync('openId')
    let props = {
      url: "/api/vendor/getFeedbackInfo",
      contentType: 'application/json',
      data: {
        "id": id
      },
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
    }
    this.request(props);
  }
}
export { Patient };