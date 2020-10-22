import { Patient } from "./index_modle"
import { TimUtils } from "../../utils/TimUtils.js"
const timUtils = new TimUtils();
let patientInfo = new Patient();
Page({

  /**
 * 页面的初始数据
 */
  data: {
    accountType: "",
    screenShow: false,
    loadmoreShow: "false",
    loadmoreType: "end",
    healthTotal: 1,
    healthPageNum: 1,
    healthPageSize: 10,
    name: "",
    patientList: [],
    isLogin: false,
    doctorList: [],
    replayList: [
      { id: 1, name: "已绑定", state: "1" },
      { id: 2, name: "未绑定", state: "0" }
    ],
    replyNum: "",
    replyAllNum: null,
    doctorNum: "",
    doctorAllNum: null,
    state: "",
    doctor: "",
  },
  // 点击单个患者查看详情
  patientListTap: function (e) {
    console.log(e);
    const id = e.currentTarget.dataset.patientmessage.patientUuid
    const isOperationRecord = e.currentTarget.dataset.patientmessage.isOperationRecord
    const isBindingDoctor = e.currentTarget.dataset.patientmessage.isBindingDoctor
    const doctorName = e.currentTarget.dataset.patientmessage.doctorName
    wx.setStorageSync('patientUuid', id)
    if (isOperationRecord == 0 || isBindingDoctor == 0) {
      wx.navigateTo({
        url: '/pages/patient/isMessage/isMessage?id=' + id + '&isOperationRecord=' + isOperationRecord + '&isBindingDoctor=' + isBindingDoctor + '&doctorName=' + doctorName,
      })
    } else {
      wx.navigateTo({
        url: '/pages/patient/patientDetail/index?id=' + id,
      })
    }
  },
  // 获取所有患者列表
  getUserInfo: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
    });
    patientInfo.getUserInfo(this.data.name, this.data.healthPageNum, this.data.healthPageSize, that.data.state, that.data.doctor, (res) => {
      console.log(res);
      var num = Math.ceil(res.count / that.data.healthPageSize);
      that.setData({
        patientList: that.data.patientList.concat(res.data),
        healthTotal: num
      })
    });
  },
  // 搜索患者名称
  bindinputSearch: function (e) {
    this.setData({
      name: e.detail.value,
      healthPageNum: 1,
      patientList: [],
      healthTotal: 1,
    })
    this.getUserInfo()
  },
  // 获取科室医生列表
  getDoctorList: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
    });
    patientInfo.getDoctorList((res) => {
      console.log(res);
      that.setData({
        doctorList: res.data
      })
    });
  },
  // 筛选
  screen: function () {
    let that = this
    that.setData({
      screenShow: true,
      replyNum: "",
      replyAllNum: null,
      doctorNum: "",
      doctorAllNum: null,
    })
  },
  // 回复选择
  replayState: function (e) {
    let that = this
    let state = e.currentTarget.dataset.state
    let replay = that.data.replayList
    this.setData({
      replyNum: state
    })
  },
  // 回复选择全部
  chooseReplyAll: function () {
    let that = this
    if (that.data.replyAllNum == null) {
      that.setData({
        replyAllNum: 1,
        replyNum: null,
      })
    } else {
      that.setData({
        replyAllNum: null,
        replyNum: null,
      })
    }

  },
  // 科室医生选择全部
  chooseDoctorAll: function (e) {
    let that = this
    if (that.data.doctorAllNum == null) {
      that.setData({
        doctorAllNum: 1,
        doctorNum: null,
      })
    } else {
      that.setData({
        doctorAllNum: null,
        doctorNum: null,
      })
    }
  },
  // 医生单选
  doctorState: function (e) {
    console.log(e);
    let that = this
    let state = e.currentTarget.dataset.state
    this.setData({
      doctorNum: state
    })
  },
  // 确认筛选
  btnScreen: function (e) {
    let that = this
    let replyAllNum = that.data.replyAllNum
    let replyNum = that.data.replyNum
    let doctorAllNum = that.data.doctorAllNum
    let doctorNum = that.data.doctorNum
    console.log(doctorNum);
    // 绑定状态参数
    if (replyAllNum == null && replyNum == null) {
      wx.showToast({
        title: '请选择绑定状态',
        icon: "none"
      })
      return
    } else if (replyAllNum != null) {
      that.setData({
        state: ""
      })
    } else if (replyAllNum == null && replyNum != null) {
      that.setData({
        state: replyNum
      })
    }
    // 科室医生选择
    if (doctorAllNum == null && doctorNum == null) {
      wx.showToast({
        title: '请选择科室医生',
        icon: "none"
      })
      return
    } else if (doctorAllNum != null) {
      that.setData({
        doctor: ""
      })
    } else if (doctorAllNum == null && doctorNum != null) {
      that.setData({
        doctor: doctorNum
      })
    }
    that.setData({
      patientList: [],
      healthPageNum: 1,
      screenShow: false,
    })
    this.getUserInfo();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  login: function () {
    wx.clearStorage();
    wx.nextTick(() => {
      wx.navigateTo({
        url: '/pages/Authorization/index',
      })
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    let that = this;
    let openId = wx.getStorageSync('openId');
    let isExist = wx.getStorageSync('isExist');
    let accountType = wx.getStorageSync('accountType');
    that.setData({
      accountType: accountType
    })
    if (openId) {
      this.setData({
        isLogin: true
      });
      if (isExist == "0") {
        wx.navigateTo({
          url: '../bindNum/bindNum',
        })
      } else {
        // if (this.data.patientList.length == 0 || this.data.patientList == null) {}
        this.setData({
          healthPageNum: 1,
          patientList: [],
        })
        this.getUserInfo();
        this.getDoctorList()
        timUtils.LoginTim((res) => {

        });
      }

    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */onUnload: function () {

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
    let that = this;
    if (this.data.healthTotal > this.data.healthPageNum) {
      this.setData({
        loadmoreShow: true,
        loadmoreType: "loading",
        healthPageNum: that.data.healthPageNum + 1
      });
      this.getUserInfo();
    } else {
      this.setData({
        loadmoreShow: true,
        loadmoreType: "end"
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})