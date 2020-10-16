import { Comm } from "../../../utils/Common"
class Patient extends Comm {
  constructor() {
    super();
  }
  getManufacturerList(callback) {
    let props = {
      url: "/api/vendor/getVendorList",
      contentType: 'application/json',
      data: {},
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
  // 保存
  btnSave(messageObj, callback) {
    let props = {
      url: "/api/vendor/feedback",
      contentType: 'application/json',
      data: {
        goodsModelId: messageObj.goodsModelId,
        goodsId: messageObj.goodsId,
        userType: messageObj.userType,
        vendorId: messageObj.vendorId,
        patientUuid: messageObj.patientUuid,
        content: messageObj.content,
        photos: messageObj.photos,
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