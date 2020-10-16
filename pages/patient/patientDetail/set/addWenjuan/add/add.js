// pages/patient/patientDetail/set/addWenjuan/index.js

import { Add } from "./add.modle"
let AddInfo = new Add();
let saveInfo = new Add();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    name: "",
    editIndex: 0,
    wenjuanList: [],
  },
  // 选择完量表 确认
  search: function () {

  },
  // 获取问卷列表
  getWenJuanList: function () {
    wx.showLoading({
      title: '加载中...',
    });
    AddInfo.getWenJuanList(this.data.name, (res) => {
      this.setData({
        wenjuanList: res
      })
    });
  },
  // 搜索问卷名称
  bindinputSearch: function (e) {
    this.setData({
      name: e.detail.value
    })
    this.getWenJuanList()
  },
  // 选择推送时间

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })

  },

  // 多选事件
  checkboxChange: function (e) {
    console.log(e);

    // 1 获取被选中的复选框的值
    const checked = e.detail.value
    this.setData({
      checked
    })
    console.log(this.data.checked);
  },
  // 选择文件保存
  btnSave: function () {
    let that = this
    // 复选框获取的id与对象数组进行遍历得到 该id下的整个对象
    var idlist = that.data.checked
    var InfoList = that.data.wenjuanList
    var checkedList = []
    if (idlist == undefined || idlist.length == 0) {
      wx.showToast({
        title: '请选择量表',
        icon: "none"
      });
      return;
    }
    for (var i = 0; i < idlist.length; i++) {
      for (var j = 0; j < InfoList.length; j++) {
        if (idlist[i] == InfoList[j].uuid) {
          checkedList.push(InfoList[j])
        }
      }
    }
    if (!this.data.date) {
      wx.showToast({
        title: '请选择推送时间',
        icon: "none"
      });
      return;
    }
    if (checkedList.length == 0) {
      wx.showToast({
        title: '请选择量表',
        icon: "none"
      });
      return;
    }
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    console.log("上一个页面数据");
    var packagesList = prevPage.data.packagesList;
    var packList = {
      time: that.data.date,
      sheetList: checkedList
    };

    if (packagesList != undefined) {
      packagesList.push(packList);
      prevPage.setData({
        packagesList: packagesList,
      })
    } else {
      packagesList = [];
      packagesList.push(packList);
      prevPage.setData({
        packagesList: packagesList,
      })
    }
    var checkPackagesList = prevPage.data.checkedList;
    wx.navigateBack({
      delta: 1,
    })
  },
  // 修改保存
  editBtnSave: function (e) {
    let that = this
    // 复选框获取的id与对象数组进行遍历得到 该id下的整个对象
    var idlist = that.data.checked
    var InfoList = that.data.wenjuanList
    var checkedList = []
    if (idlist == undefined || idlist.length == 0) {
      wx.showToast({
        title: '请选择量表',
        icon: "none"
      });
      return;
    }
    for (var i = 0; i < idlist.length; i++) {
      for (var j = 0; j < InfoList.length; j++) {
        if (idlist[i] == InfoList[j].uuid) {
          checkedList.push(InfoList[j])
        }
      }
    }
    if (!this.data.date) {
      wx.showToast({
        title: '请选择推送时间',
        icon: "none"
      });
      return;
    }
    if (checkedList.length == 0) {
      wx.showToast({
        title: '请选择量表',
        icon: "none"
      });
      return;
    }
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var packList = {
      time: that.data.date,
      sheetList: checkedList
    };
    console.log(packList);
    let edit = prevPage.data.packagesList
    console.log(edit);

    edit[that.data.editIndex] = packList
    console.log(edit);

    prevPage.setData({
      packagesList: edit,
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  // 获取当前时间
  getDateNow: function () {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    this.setData({
      date: currentdate
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWenJuanList()
    this.getDateNow()
    this.setData({
      editId: options.editId,
      editIndex: options.editIndex
    })
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
    let that = this
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    // 1 状态为 修改问卷操作
    if (that.data.editId == 1) {
      var index = that.data.editIndex
      var checkPackagesList = prevPage.data.packagesList[index]
      this.setData({
        date: checkPackagesList.time
      })
    }
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