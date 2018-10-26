// pages/homepage/homepage.js
const app = getApp()
var names, header;
function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  //console.log(Y + M + D + h + m + s);
  return Y + M + D;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: '',
    currentTab: 1,
    scrollLeft: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    wx.request({
      url: app.globalData.URL + '/user/me',
      method: 'GET',
      header: {
        "S-TOKEN": wx.getStorageSync("userTOKEN")
      },
      success: function (res) {
        console.log(res);
        names = res.data.data.nickName;
        header = res.data.data.avatarUrl;
        that.setData({
          myName: res.data.data.nickName,
          myHead: res.data.data.avatarUrl
        });
        that.MyTime();
      }
    })
    
  },

  MyStar: function(event) {
    var that = this;
    wx.request({
      url: app.globalData.URL + '/time/collection',
      method: 'GET',
      header: {
        "S-TOKEN": wx.getStorageSync("userTOKEN")
      },
      success: function (res) {
        console.log(res.data.data);
          if(res.data.data.length == 0) {
            that.setData({
              list: []
            })
          }
          else{
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].updateTime = timestampToTime(res.data.data[i].updateTime);
              // console.log(res.data.data[i]);
            }
            that.setData({
              list: res.data.data
            })
          }
      }
    })
  },

  MyTime: function (event) {
    var that = this;
    wx.request({
      url: app.globalData.URL + '/time/me',
      method: 'GET',
      header: {
        "S-TOKEN": wx.getStorageSync("userTOKEN")
      },
      success: function (res) {
        console.log(res.data.data);
        if (res.data.data.length == 0) {
          that.setData({
            list: []
          })
        }
        else{
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].imgUrl = res.data.data[i].imgUrl;
            res.data.data[i].avatarUrl = header;
            res.data.data[i].nickName = names;
            res.data.data[i].updateTime = timestampToTime(res.data.data[i].updateTime);
          }
          that.setData({
            list: res.data.data
          })
        }
      }
    })
  },

  toDetail: function (e) {
    var ids = e.target.id;
    console.log(ids);
    wx.navigateTo({
      url: '../detail/detail?id=' + ids
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

  },

  swichNav: function (e) { 
    var cur = e.target.dataset.current; 
    var that =this;
    if (this.data.currentTaB == cur) { 
      return false; 
    } else { 
      this.setData({ currentTab: cur }) 
      if(cur == 0) that.MyStar();
      if (cur == 1) that.MyTime();
    } 
  }
})