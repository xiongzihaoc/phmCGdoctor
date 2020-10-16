import { Comm } from "../../../../utils/Common"
// 报告单
class Report extends Comm {
  constructor() {
    super();
  }
  getReportInfo(patientUuid, callback) {
    let props = {
      url: "/api/getMedicalReport",
      contentType: 'application/json',
      data: {
        "patientUuid": patientUuid,
        pageNum: 1000,
        pageSize: 1000,
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
export { Report };