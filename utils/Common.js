import { Config } from "config.js";
class Comm {
  constructor() {
  }
  request(params) {
    let that = this;
    let token = wx.getStorageSync('openId')
    let url = Config.baseUrl + params.url;
    if (!params.type) {
      params.type = "POST";
    }
    if (!params.data) {
      params.data = {}
    }
    wx.request({
      url: url,
      data: params.data,
      header: {
        Authorization: token,
        'content-type': params.contentType,
      },
      method: params.type,
      success: function (res) {
        if (res.data.code == 200) {
          params.sCallBack && params.sCallBack(res.data);
        } else {
          if (res.data.code == 410) {
            wx.showToast({
              title: '授权过期，请重新授权',
              icon: 'none'
            });
            wx.navigateTo({
              url: '/pages/Authorization/index',
            })
          } else {
            params.eCallBack && params.eCallBack(res.data);
          }

        }
      },
      fail: function (res) {
        params.eCallBack && params.eCallBack(res.data);
      }
    })
  }
}
export { Comm };

