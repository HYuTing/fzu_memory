//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getSetting({
      success: res => {
        wx.login({
          success: res => {
            if (res.code) {
              wx.request({
                url: 'http://time.huanglexing.com/user/login',
                method: 'GET',
                data: {
                  code: res.code
                },
                success: function() {
                  console.log(res.text)
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
      },
      fail: res => {
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              // 获取用户信息
              wx.getUserInfo({
                success: getuserinfores => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = getuserinfores.userInfo
                  wx.request({
                    url: 'http://time.huanglexing.com/user/oauth',
                    method: 'POST',
                    data: {
                      code: res.code,
                      encryptedData: getuserinfores.encryptedData,
                      ivStr: getuserinfores.iv
                    }
                  })

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
      }
    })

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