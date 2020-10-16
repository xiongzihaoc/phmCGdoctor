import { Patient } from "./isMessage.modle"

var getCurrentDate = require("../../../utils/util")
let patientInfo = new Patient();
Page({

  /**
 * 页面的初始数据
 */
  data: {
    userType: "",
    date: "",
    dictLabel: "请选择",
    dictValue: "",
    ManufacturerName: "请选择",
    ManufacturerValue: "",
    InstrumentName: "请选择",
    InstrumentValue: "",
    doctorName: "请选择",
    doctorValue: "",
    instrDisabled: true,
    instrCondition: "",
    messObj: {},
    DoctortList: [],
    MethodList: [],
    InstrumentList: [],
    ManufacturerList: [],
    prepuce_method: "prepuce_method",
    // 是否维护信息
    isOperationRecord: "",
    // 是否绑定医生
    isBindingDoctor: ""

  },

  // 获取所有患者列表
  getUserInfo: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
      icon: "none",
    });
    patientInfo.getUserInfo(this.data.messObj, (res) => {
      console.log(res);
    });
  },
  // 获取手术方式列表
  getMethodList: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
      icon: "none",
    });
    patientInfo.getMethodList(that.data.prepuce_method, (res) => {
      console.log(res)
      that.setData({
        MethodList: res.data
      })

    });
  },
  // 获取器械品牌列表
  getManufacturerList: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
      icon: "none",
    });
    patientInfo.getManufacturerList((res) => {
      console.log(res);
      that.setData({
        ManufacturerList: res.data
      })
    });
  },
  // 获取器械类型列表
  getInstrumentList: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
      icon: "none",
    });
    patientInfo.getInstrumentList(that.data.ManufacturerValue, (res) => {
      console.log(res);
      that.setData({
        InstrumentList: res.data
      })
    });
  },
  // 获取医生列表
  getDoctorList: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
      icon: "none",
    });
    patientInfo.getDoctorList((res) => {
      console.log(res);
      that.setData({
        DoctortList: res.data
      })
    });
  },
  // 选择手术时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // 选择手术方式
  bindMethodChange: function (e) {
    let that = this
    let MethodIndex = e.detail.value
    that.setData({
      dictLabel: that.data.MethodList[MethodIndex].dictLabel,
      dictValue: that.data.MethodList[MethodIndex].dictValue
    })
  },
  // 选择器械品牌
  bindManufacturerChange: function (e) {
    let that = this
    let ManufacturerIndex = e.detail.value
    that.setData({
      ManufacturerName: that.data.ManufacturerList[ManufacturerIndex].name,
      ManufacturerValue: that.data.ManufacturerList[ManufacturerIndex].id,
      instrDisabled: false,
    })
    this.getInstrumentList()
  },
  // 选择器械类型
  bindInstrumentChange: function (e) {
    let that = this
    let InstrumentIndex = e.detail.value
    that.setData({
      InstrumentName: that.data.InstrumentList[InstrumentIndex].name,
      InstrumentValue: that.data.InstrumentList[InstrumentIndex].id
    })
  },
  // 选择管理医生
  bindDoctor: function (e) {
    console.log(e);
    let that = this
    let MethodIndex = e.detail.value
    console.log(that.data.DoctortList[MethodIndex].doctorName);
    that.setData({
      doctorName: that.data.DoctortList[MethodIndex].doctorName,
      doctorValue: that.data.DoctortList[MethodIndex].doctorUuid
    })
  },
  // 输入器械建议
  bindCondition: function (e) {
    let that = this
    console.log(e.detail.value);

    that.setData({
      instrCondition: e.detail.value
    })
  },
  // 如果未选择品牌就选择类型提示
  bindInstrument: function () {
    let that = this
    if (that.data.ManufacturerName == "请选择") {
      wx.showToast({
        title: '请选择品牌',
        icon: "none"
      })
      return
    }
  },
  btnSave: function () {
    // 医生账户医生的id
    let docUuid = wx.getStorageSync('openId')
    // 护士账户判断
    let accountType = wx.getStorageSync('accountType')
    // 患者id
    let patientUuid = wx.getStorageSync('patientUuid')
    let that = this
    if(accountType == 0){
      if (this.data.doctorValue == "") {
        wx.showToast({
          title: '请选择管理医生',
          icon: "none",
        })
        return
      } 
    }
    if (this.data.ManufacturerValue == "") {
      wx.showToast({
        title: '请选择器械品牌',
        icon: "none",
      })
      return
    }
    
    if (this.data.dictValue == "") {
      wx.showToast({
        title: '请选择手术方式',
        icon: "none",
      })
      return
    } 
    if (this.data.InstrumentValue == "") {
      wx.showToast({
        title: '请选择器械类型',
        icon: "none",
      })
      return
    }
    let messageObj = {
      uuid: patientUuid,
      doctoruuid: docUuid,
      prepuceOperateTime: that.data.date,
      prepuceOperateMethod: that.data.dictValue,
      feedbackContent: that.data.instrCondition,
      vendorId: that.data.ManufacturerValue,
      goodsModelId: that.data.InstrumentValue,
    }
    if (accountType == 0) {
      messageObj.doctoruuid = that.data.doctorValue
    }
    wx.showLoading({
      title: '加载中...',
    });
    patientInfo.btnSave(messageObj, (res) => {
      wx.redirectTo({
        url: '/pages/patient/patientDetail/index?id=' + patientUuid,
      })
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userType = wx.getStorageSync('accountType')
    let time = getCurrentDate.getCurrentDate()
    if (options.isBindingDoctor == 1) {
      this.setData({
        doctorName: options.doctorName,
      })
    }
    this.setData({
      isBindingDoctor: options.isBindingDoctor,
      isOperationRecord: options.isOperationRecord,
      date: time,
      userType: userType
    })
    this.getMethodList()
    this.getDoctorList()
    this.getManufacturerList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})