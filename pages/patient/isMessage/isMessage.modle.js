import { Comm } from "../../../utils/Common.js"
class Patient extends Comm {
  constructor() {
    super();
  }
  getUserInfo(time, method, vendorId, goodsModelId, callback) {
    var uuid = wx.getStorageSync('patientUuid')
    let props = {
      url: "/api/prepuce/doctor/maintainOperation",
      contentType: 'application/json',
      data: {
        uuid: uuid,
        prepuceOperateTime: time,
        prepuceOperateMethod: method,
        vendorId: vendorId,
        goodsModelId: goodsModelId
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
  getMethodList(prepuce_method, callback) {
    let props = {
      url: "/api/getDict",
      contentType: 'application/json',
      data: {
        dictType: prepuce_method,
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
  getManufacturerList(callback) {
    let props = {
      url: "/api/vendor/getVendorList",
      contentType: 'application/json',
      data: {

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
  getInstrumentList(id, callback) {
    let props = {
      url: "/api/vendor/getVendorGoods",
      contentType: 'application/json',
      data: {
        id: id
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
  // 保存
  btnSave(messageObj, callback) {
    let props = {
      url: "/api/prepuce/doctor/maintainOperation",
      contentType: 'application/json',
      data: {
        uuid: messageObj.uuid,
        doctorUuid: messageObj.doctoruuid,
        prepuceOperateTime: messageObj.prepuceOperateTime,
        prepuceOperateMethod: messageObj.prepuceOperateMethod,
        feedbackContent: messageObj.feedbackContent,
        vendorId: messageObj.vendorId,
        goodsModelId: messageObj.goodsModelId,
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
export { Patient };