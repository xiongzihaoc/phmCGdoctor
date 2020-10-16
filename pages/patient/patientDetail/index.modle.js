import { Comm } from "../../../utils/Common.js"
// 个人信息
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
// 问题记录 历史
class Matter extends Comm {
  constructor() {
    super();
  }
  getMatterInfo(patientUuid, callback) {
    let props = {
      url: "/api/getPatientMatter",
      contentType: 'application/json',
      data: {
        "patientUuid": patientUuid,
        pageNum: 1000,
        pageSize: 1000

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
// 随访更多
class FollowMore extends Comm {
  constructor() {
    super();
  }
  getFollowInfo(patientUuid, callback) {
    let props = {
      url: "/api/QuestionnaireSum",
      contentType: 'application/json',
      data: {
        "patientUuid": patientUuid,
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
// 维护详情
class Maint extends Comm {
  constructor() {
    super();
  }
  getMaintInfo(patientUuid, callback) {
    let props = {
      url: "/api/getMaintain",
      contentType: 'application/json',
      data: {
        "patientUuid": patientUuid,
        pageNum: 1000,
        pageSize: 1000

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
  getDayfeedbackInfo(callback) {
    let patientUuid = wx.getStorageSync('patientUuid')
    let props = {
      url: "/api/bowe/dailyFeedBackList",
      contentType: 'application/json',
      data: {
        "patientUuid": patientUuid,
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
  // 报告单
  getReportInfo(patientUuid, callback) {
    let props = {
      url: "/api/getMedicalReport",
      contentType: 'application/json',
      data: {
        "patientUuid": patientUuid,
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
export { Matter, UserInfo, Maint, FollowMore };