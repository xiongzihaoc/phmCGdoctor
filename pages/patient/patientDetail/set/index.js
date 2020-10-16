// pages/patient/patientDetail/set/index.js
import { Save } from "./index.modle"
let saveInfo = new Save();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    packagesList: [],
    editIndex: 0,
    editList: {},
  },
  // 添加问卷
  addWenjuan: function () {
    wx.navigateTo({
      url: '/pages/patient/patientDetail/set/addWenjuan/index',
    })
  },
  addCombo: function () {
    wx.navigateTo({
      url: '/pages/patient/patientDetail/set/addWenjuan/add/add',
    })
  },
  // 修改套餐
  edit: function (e) {
    let that = this
    var index = e.currentTarget.dataset.info
    var editTac = that.data.packagesList[index]
    wx.navigateTo({
      url: '/pages/patient/patientDetail/set/addWenjuan/add/add?editId=' + "1&editIndex=" + index,
    })
  },
  // 保存套餐
  btnSaveCombo: function () {
    if (this.data.packagesList.length <= 0) {
      wx.showToast({
        title: '请选择套餐',
        icon: "none",
      })
      return;
    } else {
      var patientUuid = wx.getStorageSync('patientUuid')
      var packagesList = this.data.packagesList
      var taocArr = []
      packagesList.forEach((item) => {
        var questionnaireList = []
        var infoObj = {}
        item.sheetList.forEach((subItem) => {
          infoObj = {
            questionnaireUuid: subItem.uuid,
            questionnaireName: subItem.name
          }
          questionnaireList.push(infoObj)
        })
        // 转成接口需要的格式
        var obj = {
          followUpTime: item.time,
          patientUuid: patientUuid,
          questionnaireList: questionnaireList
        }
        taocArr.push(obj)
      })
      wx.showLoading({
        title: '加载中...',
      });
      saveInfo.btnSaveCombo(taocArr, res => {
        if (res.code == 200) {
          wx.navigateBack({
            delta: 1,
          })
        } else {
          wx.showToast({
            title: '保存失败,请重新选择',
            icon: "none"
          })
        }

      });
    }

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