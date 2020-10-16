import { Comm } from "../../../../utils/Common"
// 个人信息

// 维护详情
class Maint extends Comm {
  constructor() {
    super();
  }
  getDayfeedbackInfo(stime, etime, callback) {
    let patientUuid = wx.getStorageSync('patientUuid')
    let props = {
      url: "/api/bowe/dailyFeedBackList",
      contentType: 'application/json',
      data: {
        "patientUuid": patientUuid,
        "createTime": stime,
        "endTime": etime
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
export { Maint };