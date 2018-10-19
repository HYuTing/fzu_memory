// pages/rankinglist/rankinglist.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    marginTop: '',
    content: '',
    src: '../../img/add.png',
    longitude: '',
    latitude: '',
    positionInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type: 'wgs84',   
      success: res => {
        var userlongitude = res.longitude
        var userlatitude = res.latitude
        this.loadCity(userlongitude, userlatitude)

        this.setData({
          longitude: userlongitude,
          latitude: userlatitude
        })
      }
    })

    this.setData({
      marginTop: app.globalData.height
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  loadCity: function (longitude, latitude) {
    var that = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=f9L7fSmYr5pARpKT9C6dMgsNd04lM25a&location=' + latitude + ',' + longitude + '&output=json',
      success: function (res) {
        //console.log(res);
        var city = res.data.result.formatted_address;
        that.setData({
          positionInfo: city
        });
      },
      fail: function () {
        that.setData({
          positionInfo: "获取定位失败"
        });
      },

    })
  },

  chooseImage: function() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res);
        that.setData({
          src: res.tempFilePaths
        })
      },
    })
  },

  updateContent: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  
  report: function() {
    var that = this
    console.log(that.data.content);
    
    var stoken;
    wx.getStorage({
      key: 'userTOKEN',
      success: function(res) {
        stoken = res.data
      },
    })

    wx.request({
      url: 'http://time.huanglexing.com/time/upload',
      method: 'POST',
      header: {
        "S-TOKEN": stoken
      },
      data: {
        content: that.data.content,
        latitude: that.data.latitude,
        longitude: that.data.longitude,
        lable: '',
        title: ''
      },
      success: res => {
        // wx.uploadFile({
        //   url: '',
        //   filePath: that.data.src,
        //   name: 'img',
        //   header: {
        //     "S-TOKEN": stoken
        //   },
        //   success: function() {

        //   },
        //   fail: function() {
            
        //   }
        // })
        console.log('发表成功：'+res.data.text)

        wx.showModal({
          title: '分享',
          content: '是否将您的福大记忆分享到朋友圈',
          success: function(res) {
            if(res.confirm) {
              // 用户同意分享至朋友圈
              wx.navigateTo({
                url: '../share/share',
              })
            }
            else {
              wx.showToast({
                title: '发表成功',
                icon: "success"
              })
            }
          }
        })
      },
      fail: res => {
        console.log('发表失败：'+res.data.text)
      }
    })
  }
})