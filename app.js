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
    })
  },
  globalData: {
    userInfo: null
  }
})