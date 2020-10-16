import { Comm } from "../../utils/Common.js"
class RegModle extends Comm {
  constructor() {
    super();
  }
  getUserInfo(callback) {
    let props = {
      url: "/api/getUserInfo",
      contentType: 'application/json',
      data: {
        openId: wx.getStorageSync('openId'),
        type: 0,
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
export { RegModle };