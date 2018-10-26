const app = getApp()

Page({
  data: {
    loginflag: 0,
    latitude: 26.056,
    longitude: 119.1981,
    markers: [],
    hasmarks: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //判断用户是否授权
    wx.getSetting({
      success: res => {
        console.log(res);
        //如果用户已经授过权，则直接进入地图
        if (res.authSetting["scope.userInfo"] == true) {
          that.setData({
            loginflag: 1
          })
        }
      }
    })

    if (that.data.loginflag == 1) {
      //如果已经授权过，则调用登录login
      wx.login({
        success: res => {
          console.log(res);
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if(res.code) {
            wx.request({
              url: app.globalData.URL + '/user/login',
              method: 'GET',
              data: {
                "code": res.code
              },
              success: r => {
                console.log(r);
                //将TOKEN存在仓库中
                wx.setStorage({
                  key: 'userTOKEN',
                  data: r.header["S-TOKEN"],
                })

                var usertoken = r.header["S-TOKEN"];
                that.getMapmarkers(usertoken);
                console.log(that.data.markers);
              }
            })
          }
        },
        fail: function() {
          console.log('调用微信登录接口失败')
        }
      })
    }
  },

  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },

  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  
  tohomepage: function () {
    wx.navigateTo({
      url: '../homepage/homepage',
    })
  },

  toranklist: function () {
    wx.navigateTo({
      url: '../ranklist/ranklist',
    })
  },

  toReport: function () {
    wx.navigateTo({
      url: '../report/report',
    })
  },

  //获取地图上的点
  getMapmarkers: function (token) {
    var that = this;
    wx.request({
      url: app.globalData.URL + '/time/map',
      method: 'GET',
      header: {
        "S-TOKEN": '' + token
      },
      success: res => {
        var marksdata = res.data.data;
        for (var i = 0; i < marksdata.length; i++) {
          marksdata[i].iconPath = '/img/location.png';
        }
        that.setData({
          markers: marksdata,
          hasmarks: true
        })
      }
    })
  },

  //子组件中点击事件触发父组件事件
  empower: function(event) {
    var ifempower = event.detail.val;
     console.log(ifempower);
    this.setData({
      loginflag: ifempower
    })
    
    wx.getLocation({
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        // console.log(that.data.markers);
      },
    })
  }
})