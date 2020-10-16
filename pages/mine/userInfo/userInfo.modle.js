import { Comm } from "../../../utils/Common.js"
class UserInfo extends Comm {
  constructor() {
    super();
  }
  getUserInfo(docId, callback) {
    let props = {
      url: "/api/getUserInfo",
      contentType: 'application/json',
      data: {
        openId: docId,
        // 0 医生端获取登录信息
        type: 0
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
  btnSave(data, callback) {
    let props = {
      url: "/api/updateDoctor",
      contentType: 'application/json',
      data: data,
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
export { UserInfo };