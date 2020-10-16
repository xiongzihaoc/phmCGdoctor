// pages/patient/patientDetail/followMore/followMore.js
import { FollowMore,FollowMoreNum} from "./followMore.modle"
let FollowMoreInfo = new FollowMore();
let FollowMoreInfoNum = new FollowMoreNum();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    isfinish: "",
    finish: "",
    followList: [],
    isFinshNum: {},
  },
  // 获取随访记录信息
  getFollowInfo: function () {
    wx.showLoading({
      title: '加载中...',
    });
    FollowMoreInfo.getFollowInfo(this.data.id, (res) => {
      console.log(res);
      var info = []
      info = res
      info.forEach(item => {
        item.createTime = item.createTime.slice(0, 10)
      })
      console.log(info);
      
      this.setData({
        followList: info,
      })
    });
  },
  // 获取数量
  getFollowInfoNum: function () {
    wx.showLoading({
      title: '加载中...',
    });
    FollowMoreInfoNum.getFollowInfoNum(this.data.id, (res) => {
      console.log(res);

      this.setData({
        isFinshNum: res
      })
    });
  },
  // 跳转问卷详情
  jumpDetail:function(e){
    let id = e.currentTarget.dataset.anuuid
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/patient/patientDetail/followMore/detail/detail?id=' + id +'&name=' + name,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    this.setData({
      id: options.id
    })
    this.getFollowInfo()
    this.getFollowInfoNum()

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