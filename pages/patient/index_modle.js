import { Comm } from "../../utils/Common.js"
class Patient extends Comm {
  constructor() {
    super();
  }
  getUserInfo(name, pageNum, pageSzie, isBinding, doctorUuid, callback) {
    // var doctorUuid = wx.getStorageSync('openId');
    let props = {
      url: "/api/getBindPatients",
      contentType: 'application/json',
      data: {
        "name": name,
        "isBinding": isBinding,
        "doctorUuid": doctorUuid,
        "pageNum": pageNum,
        "pageSize": pageSzie
      },
      sCallBack: res => {
        wx.hideLoading();
        callback(res);
      },
      eCallBack: err => {
        console.log(err);
        wx.hideLoading();
        wx.showToast({
          title: '请求出错,请稍后重试!!!',
          icon: 'none'
        })
      }
    }
    this.request(props);
  }
  getDoctorList(callback) {
    var doctorUuid = wx.getStorageSync('openId');
    let props = {
      url: "/api/prepuce/nurse/getDeptDoctor",
      contentType: 'application/json',
      data: {},
      sCallBack: res => {
        wx.hideLoading();
        callback(res);
      },
      eCallBack: err => {
        console.log(err);
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