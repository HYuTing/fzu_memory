// pages/ranklist/ranklist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    marginTop: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      marginTop: app.globalData.height + 10
    })
    wx.request({
      url: app.globalData.URL + '/time/rank',
      method: 'GET',
      header: {
        "S-TOKEN": wx.getStorageSync("userTOKEN")
      },
      success: function (res) {
        //console.log(res.data.data[0])
        var i;
        var elseData = new Array();
        /*for (var i = 0; i < 2; i++) {
          elseData[i] = new Array();

        }*/
        for(i=3; i<res.data.data.length; i++) {
          var j = i + 1;
          res.data.data[i].rankNum = j + 'th';
          res.data.data[i].imgUrl = res.data.data[i].imgUrl;
          elseData[i - 3] = res.data.data[i];  
         
        }
        console.log(elseData);
        console.log(elseData.length);
        that.setData({

          firstusrName: res.data.data[0].nickName,
          firstlikeNums: res.data.data[0].praiseNum,
          firstTextUrl: res.data.data[0].imgUrl,
          firstHeadUrl: res.data.data[0].avatarUrl,
          firstId: res.data.data[0].id,
          secondusrName: res.data.data[1].nickName,
          secondlikeNums: res.data.data[1].praiseNum,
          secondTextUrl:  res.data.data[1].imgUrl,
          secondHeadUrl: res.data.data[1].avatarUrl,
          secondId: res.data.data[1].id,
          thirdusrName: res.data.data[2].nickName,
          thirdlikeNums: res.data.data[2].praiseNum,
          thirdTextUrl: res.data.data[2].imgUrl,
          thirdHeadUrl: res.data.data[2].avatarUrl,
          thirdId: res.data.data[2].id,
          list: elseData
        })
        console.log(elseData);
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

  }
})