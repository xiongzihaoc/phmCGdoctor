import { Comm } from "../../../../../utils/Common"

// 随访更多
class FollowMore extends Comm {
  constructor() {
    super();
  }
  getFollowInfoNum(anUuid, callback) {
    let props = {
      url: "/api/doctor/getQuestionInfo",
      contentType: 'application/json',
      data: {
        anUuid:anUuid
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
export { FollowMore };