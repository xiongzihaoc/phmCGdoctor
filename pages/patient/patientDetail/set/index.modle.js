import { Comm } from "../../../../utils/Common"
class Save extends Comm {
  constructor() {
    super();
  }
  btnSaveCombo(packagesList, callback) {
    let props = {
      url: "/api/followUpSave",
      contentType: 'application/json',
      data: packagesList,
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
export { Save };