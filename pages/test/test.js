// pages/rankinglist/rankinglist.js
const app = getApp()

function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  console.log(Y + M + D + h + m + s);
  return Y + M + D;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    marginTop: '',
    nickName: '',
    time: '',
    content: '',
    imgUrl: '',
    location: '',
    praiseNum: '',
    like: 0,
    isCollect: 0,
    timeId: '',
    avatarUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options);

    var that = this
    this.setData({
      marginTop: app.globalData.height + 10,
      //timeId: options.id
    })
    wx.request({
      url: app.globalData.URL + '/time/explore',
      method: 'GET',
      header: {
        "S-TOKEN": wx.getStorageSync("userTOKEN")
      },
      success: function (res) {
        console.log(res)
        var sjc = res.data.data.updateTime;
        console.log(sjc);
        sjc = timestampToTime(sjc);

        that.setData({
          avatarUrl: res.data.data.avatarUrl,
          nickName: res.data.data.nickName,
          time: sjc,
          content: res.data.data.content,
          imgUrl: res.data.data.imgUrl,
          location: res.data.data.location,
          praiseNum: res.data.data.praiseNum,
          like: res.data.data.isPraise,
          isCollect: res.data.data.isCollect,
          timeId: res.data.data.id

        });

      }
    })
  },
  share: function (e) {
    var that = this;
    var ids = that.data.timeId;
    wx.navigateTo({
      url: '../share/share?id=' + ids
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
    console.log('还有啦');
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

  like: function () {
    var praiseNum = this.data.praiseNum
    if (praiseNum == 0) {
      //表示没有点过赞
      this.setData({
        praiseNum: praiseNum + 1,
        like: 1
      })
    }
    else {
      this.setData({
        praiseNum: praiseNum - 1,
        like: 0
      })
    }

    var thistimeid = this.data.timeId
    wx.request({
      url: app.globalData.URL + '/time/praise',
      method: 'GET',
      header: {
        "S-TOKEN": wx.getStorageSync("userTOKEN")
      },
      data: {
        timeId: thistimeid
      },
      success: function (res) {
        console.log(res.data.text);
      }
    })
  },

  collect: function () {
    var collect = this.data.isCollect
    if (collect == 0) {
      //表示没有收藏过
      this.setData({
        isCollect: 1
      })
    }
    else {
      this.setData({
        isCollect: 0
      })
    }

    var thistimeid = this.data.timeId
    wx.request({
      url: app.globalData.URL + '/time/collect',
      method: 'GET',
      header: {
        "S-TOKEN": wx.getStorageSync("userTOKEN")
      },
      data: {
        timeId: thistimeid
      },
      success: function (res) {
        console.log(res.data.text);
      }
    })
  },

  random: function () {
    var that = this;
    wx.request({
      url: app.globalData.URL + '/time/explore',
      method: 'GET',
      header: {
        "S-TOKEN": wx.getStorageSync("userTOKEN")
      },
      success: function (res) {
        console.log(res)
        var sjc = res.data.data.updateTime;
        console.log(sjc);
        sjc = timestampToTime(sjc);

        that.setData({
          avatarUrl: res.data.data.avatarUrl,
          nickName: res.data.data.nickName,
          time: sjc,
          content: res.data.data.content,
          imgUrl: res.data.data.imgUrl,
          location: res.data.data.location,
          praiseNum: res.data.data.praiseNum,
          topNum: 0
        })
      }
    })
  }

})