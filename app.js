//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.checkSession({
      success: function(res) {
        //处于登录态
      },
      fail: function(res) {
        //不在登录态，需要重新登录
      }
    }),

    wx.getSystemInfo({
      success: (res) => {
        //console.log(res);
        if ((res.windowWidth == 360 && res.windowHeight == 640) || (res.windowWidth == 320 && res.windowHeight == 568)) {
          this.globalData.height = res.statusBarHeight + 52
        }
        else{
          this.globalData.height = res.statusBarHeight + 46
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    URL: 'http://pybk6q.natappfree.cc'
  }
})