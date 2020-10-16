import { Patient } from "./feedbackPro.modle"
let patientInfo = new Patient();
var utils = require("../../../utils/util");
import { uploadUtil } from "../../../utils/uploadUtil.js";
const uploadutil = new uploadUtil();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchTimerPopupShow: false,
    imageList: [],
    ManufacturerName: "请选择",
    ManufacturerValue: "",
    ManufacturerList: [],
    InstrumentList: [],
    insIndex: 0,
    typeIndex: 0,
    insname: "请选择",
    insId: "",
    typeId: "",
    modleList: [],
    instrCondition: "",
    tempData:[],
    travelResource:[],
    setState:1,
    picNum:0,
  },
  selectType: function () {
    if (this.data.ManufacturerValue == "" || this.data.ManufacturerValue == null || this.data.ManufacturerValue == undefined) {
      wx.showToast({
        title: '请选择品牌',
        icon: "none",
      })
      return
    } else {
      this.setData({
        searchTimerPopupShow: true,
        modleList: this.data.InstrumentList[0].models
      });
    }
  },
  done: function (e) {
    let that = this
    var insId = this.data.InstrumentList[this.data.insIndex].id
    console.log(insId);

    if (this.data.InstrumentList[this.data.insIndex].models.length <= 0) {
      that.setData({
        insname: this.data.InstrumentList[this.data.insIndex].name,
        insId: insId,
        searchTimerPopupShow: false,
      })
    } else {
      var typeId = this.data.InstrumentList[this.data.insIndex].models[this.data.typeIndex].id
      that.setData({
        insname: this.data.InstrumentList[this.data.insIndex].name + '-' + this.data.InstrumentList[this.data.insIndex].models[this.data.typeIndex].model,
        insId: insId,
        typeId: typeId,
        searchTimerPopupShow: false,
      })
    }

  },
  clear: function () {
    this.setData({
      searchTimerPopupShow: false,
    })
  },
  // 获取器械品牌列表
  getManufacturerList: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
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
    });
    patientInfo.getInstrumentList(that.data.ManufacturerValue, (res) => {
      console.log(res);
      that.setData({
        InstrumentList: res.data
      })
    });
  },
  // 选择品牌
  bindManufacturerChange: function (e) {
    let that = this
    let ManufacturerIndex = e.detail.value
    that.setData({
      ManufacturerName: that.data.ManufacturerList[ManufacturerIndex].name,
      ManufacturerValue: that.data.ManufacturerList[ManufacturerIndex].id,
    })
    this.getInstrumentList()
  },
  // // 选择器械类型
  bindchange: function (e) {
    var qxindex = e.detail.value[0]
    var xhindex = e.detail.value[1]
    let that = this
    that.setData({
      insIndex: qxindex,
      typeIndex: xhindex,
      modleList: this.data.InstrumentList[qxindex].models
    })

  },
  // 输入反馈问题
  bindCondition: function (e) {
    let that = this
    console.log(e.detail.value);

    that.setData({
      instrCondition: e.detail.value
    })
  },
  // 上传图片
  delPic(e){
    const index = e.currentTarget.dataset.index;
    let newTempData = this.data.tempData;
    let travelResource = this.data.travelResource;
    newTempData.splice(index, 1);
    travelResource.splice(index,1);
    this.setData({
        tempData:newTempData,
        travelResource: travelResource
    });
    this.setData({
        picNum:this.data.picNum-1
    });
    console.log(this.data.tempData);
    console.log(this.data.travelResource);
},
  uploadPic(){
    let that = this;
    if(!this.data.setState){
        return false;
    }
    wx.chooseImage({
        count: 9-that.data.picNum,
        success(res) {
            const tempFilePaths = res.tempFilePaths
            let newTempFilePaths = tempFilePaths.map((tempFile)=>{
                return {
                    progress : 0,
                    url: tempFile,
                    flag:1
                }
            });
            let picNum = that.data.picNum+res.tempFilePaths.length;
            that.setData({
                tempData: that.data.tempData.concat(newTempFilePaths),
                setState:0,
                picNum: picNum
            });
            wx.showLoading({
                title: '上传图片中',
            })
            uploadutil.uploadImg(tempFilePaths,res=>{
                let newPicInfo = res.map((pic,index)=>{
                    console.log(index);
                    console.log(res.length);
                    let picUrl = pic.data;
                    that.setData({
                        travelResource:that.data.travelResource.concat(picUrl),
                        setState:1
                    });
                    if(index == res.length-1){
                        wx.hideLoading();
                    }
                });
                console.log(that.data.travelResource);
            },err=>{
                console.log(err);
            },upData=>{
                let file = upData['file'];
                let tempData = that.data.tempData;
                tempData.map((temp,index)=>{
                    if (temp.url == file){
                        temp.progress = upData["progress"];
                    }
                }); 
                that.setData({
                    tempData:tempData
                });
            });
        },
        fail(err){
            if (err.errMsg ==="chooseImage:fail cancel"){
                wx.showToast({
                    title: '取消选择',
                    icon: "none"
                    })
                }
            }
        })
    },

  // 保存
  btnSave: function (e) {
    let createBy = wx.getStorageSync('openId')
    let patientUuid = wx.getStorageSync('patientUuid')
    let that = this
    if (this.data.ManufacturerValue == "" || this.data.insId == "") {
      wx.showToast({
        title: '请选择品牌或型号',
        icon: "none"
      })
      return
    } else {
      let messageObj = {
        patientUuid: patientUuid,
        userType: 0,
        content: that.data.instrCondition,
        vendorId: that.data.ManufacturerValue,
        goodsId: that.data.insId,
        goodsModelId: that.data.typeId,
        photos: that.data.travelResource
      }
      wx.showLoading({
        title: '加载中...',
      });
      patientInfo.btnSave(messageObj, (res) => {
        if (res.code != 200) {
          wx.showToast({
            title: '保存失败',
          })
        } else {
          wx.switchTab({
            url: '/pages/mine/index',
          })
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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