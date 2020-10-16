import { Comm } from "../../utils/Common"
class RegModle extends Comm {
  constructor() {
    super();
  }
  getUserInfo(encryptedData, iv, code, callback) {
    let props = {
      url: "/api/login",
      contentType: 'application/json',
      data: {
        code: code,
        encryptedData: encryptedData,
        iv: iv,
        type: "0",
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