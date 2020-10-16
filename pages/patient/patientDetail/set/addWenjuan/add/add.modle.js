import { Comm } from "../../../../../../utils/Common"
class Add extends Comm {
  constructor() {
    super();
  }
  getWenJuanList(name, callback) {
    let props = {
      url: "/api/getQuestionnaireList",
      contentType: 'application/json',
      data: {
        name: name,
        pageSize: 15000,
        pageNum: 15000,
      },
      sCallBack: res => {
        wx.hideLoading();
        callback(res.data);
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
  btnSave(followUpTime,patientUuid,questionnaireList, callback) {
    let props = {
      url: "/api/followUpSave",
      contentType: 'application/json',
      data: {
        followUpTime: followUpTime,
        patientUuid: patientUuid,
        questionnaireList: questionnaireList,
      },
      sCallBack: res => {
        wx.hideLoading();
        callback(res.data);
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
export { Add };