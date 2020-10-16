// pages/patientDetail/index.js
var utils = require("../../../utils/util.js");
import { Matter, UserInfo, Maint, FollowMore } from "./index.modle"
let MatterInfo = new Matter();
let userInfo = new UserInfo();
let MaintInfo = new Maint();
let FollowMoreInfo = new FollowMore();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    patientId: "",
    id: "",
    reportId: "",
    maintenanceId: "",
    userInfo: {},
    Matter: {},
    MaintList: {},
    isFinsh: {},
    reportList: {},
    DayfeedbackInfo: {},
    patientUuid: "",
  },
  // 获取患者个人信息
  getUserInfo: function () {
    wx.showLoading({
      title: '加载中...',
    });
    userInfo.getUserInfo(this.data.patientId, (res) => {
      console.log(res);

      this.setData({
        patientUuid: res.uuid,
        userInfo: res
      })

    });
  },
  // 每日反馈详情
  jumpDayfeedBack: function (e) {
    wx.navigateTo({
      url: '/pages/patient/patientDetail/feedbackDay/feedbackDay',
    })
  },
  // 获取问题信息
  getMatterInfo: function () {
    wx.showLoading({
      title: '加载中...',
    });
    MatterInfo.getMatterInfo(this.data.id, (res) => {
      this.setData({
        Matter: res[0],
      })

    });
  },
  // 获取每日反馈信息
  getDayfeedbackInfo: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
    });
    MaintInfo.getDayfeedbackInfo((res) => {
      that.setData({
        DayfeedbackInfo: res[0]
      })

    });
  },
  // 获取随访问卷更多信息
  getFollowInfo: function () {
    wx.showLoading({
      title: '加载中...',
    });
    FollowMoreInfo.getFollowInfo(this.data.patientId, (res) => {
      console.log(res, 333333333333333333);

      this.setData({
        isFinsh: res
      })


    });
  },
  // 获取报告单信息
  getReportInfo: function () {
    wx.showLoading({
      title: '加载中...',
    });
    MaintInfo.getReportInfo(this.data.reportId, (res) => {
      console.log(res);

      this.setData({
        reportList: res[0],
      })

    });
  },
  // 跳转个人信息详情
  jumpDetail: function () {
    const patientId = this.data.patientId
    wx.navigateTo({
      url: `/pages/patient/patientDetail/userInfoDetail/index?id=${patientId}`,
    })
  },
  // 跳转异常报告
  jumpHistory: function () {
    const id = this.data.id
    wx.navigateTo({
      url: '/pages/patient/patientDetail/history/index?id=' + id
    })
  },
  // 跳转发送消息
  sendMessage: function () {
    wx.navigateTo({
      url: "/pages/message/chat/chat",
    })
  },
  // 跳转到问卷设置
  setWenjuan: function () {
    const id = this.data.patientId
    wx.navigateTo({
      url: '/pages/patient/patientDetail/set/index?id=' + id,
    })
  },
  // 跳转到随访问卷更多记录
  jumpFollowMore: function () {
    const id = this.data.patientId
    console.log(id);
    wx.navigateTo({
      url: '/pages/patient/patientDetail/followMore/followMore?id=' + id,
    })
  },
  // 跳转到报告单更多
  bingtapMore: function () {
    const id = this.data.patientId
    wx.navigateTo({
      url: '/pages/patient/patientDetail/more/more?id=' + id,
    })
  },
  // 跳转到排出详情
  ejectment: function () {
    const id = this.data.maintenanceId
    wx.navigateTo({
      url: '/pages/patient/patientDetail/feedbackDay/feedbackDay'
    })
  },
  // 跳转到腹痛
  stomachache: function () {
    const id = this.data.maintenanceId
    wx.navigateTo({
      url: '/pages/patient/patientDetail/stomachache/stomachache?id=' + id,
    })
  },
  // 跳转到饮食
  foodDetail: function () {
    const id = this.data.maintenanceId
    wx.navigateTo({
      url: '/pages/patient/patientDetail/dietetic/dietetic?id=' + id,
    })
  },
  // 解除绑定
  removeBinding: function () {
    var docId = wx.getStorageSync('openId')
    // var patId = 
    wx.showLoading({
      title: '加载中...',
    });
    ReportInfo.removeBinding(this.data.patientId, docId, (res) => {
      if (res.code != 200) {
        wx.showToast({
          title: '解绑失败，请稍后重试',
        })
        return
      } else {
        wx.showToast({
          title: '解绑成功',
        })
        wx.navigateBack({
          delta: 1,
        })
      }
    });
  },
  // 预览图片
  preViewImage: function (e) {
    var url = utils.getDataSet(e, "url");
    // console.log(url);
    var urls = [];
    urls.push(url);
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      patientId: options.id,
      id: options.id,
      reportId: options.id,
      maintenanceId: options.id
    })
    // 获取个人信息
    this.getUserInfo()
    // 获取问题记录信息
    this.getMatterInfo()
    // 获取维护详情信息
    this.getDayfeedbackInfo()
    // 获取随访更多信息
    this.getFollowInfo()
    // 获取报告单信息
    this.getReportInfo()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})