import { Comm } from "../../../../utils/Common"
// 维护详情
class Maint extends Comm {
  constructor() {
    super();
  }
  getMaintInfo(pageNum, pageSize, createTime, endTime, callback) {
    var patientUuid = wx.getStorageSync('patientUuid')
    let props = {
      url: "/api/getMaintain",
      contentType: 'application/json',
      data: {
        "patientUuid": patientUuid,
        "actualTime": createTime,
        "endTime": endTime,
        "pageNum": pageNum,
        "pageSize": pageSize,
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