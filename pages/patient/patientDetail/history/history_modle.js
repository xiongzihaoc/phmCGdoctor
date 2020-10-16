import { Comm } from "../../../../utils/Common.js"
class Matter extends Comm {
  constructor() {
    super();
  }
  // 问题记录 历史
  getMatterInfo(pageNum, pageSize, createTime, endTime, callback) {
    var patientUuid = wx.getStorageSync('patientUuid')
    let props = {
      url: "/api/getPatientMatter",
      contentType: 'application/json',
      data: {
        "patientUuid": patientUuid,
        "createTime": createTime,
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
export { Matter };