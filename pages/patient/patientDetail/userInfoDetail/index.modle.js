import { Comm } from "../../../../utils/Common.js"
class UserInfo extends Comm {
  constructor() {
    super();
  }
  getUserInfo(patientUuid, callback) {
    let props = {
      url: "/api/getUserInfo",
      contentType: 'application/json',
      data: {
        "openId": patientUuid,
        // 1 医生端获取患者信息
        type: 1
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
export {UserInfo };