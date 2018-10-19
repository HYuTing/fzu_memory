function Person(id, latitude, longitude, name) {
  this.id = id;
  this.latitude = latitude;
  this.longitude = longitude;
  this.iconPath = '/img/location.png';
  this.name = name;
}

var marks = new Array();
var i;

for (i = 1; i <= 10; i++) {
  marks.push(new Person(i, 26.050 + i / 10, 119.1981 + i / 10, "张金铭"));
}

const app = getApp()

Page({
  data: {
    loginflag: 0,
    latitude: 26.056,
    longitude: 119.1981,
    markers: [{
      id: 1,
      latitude: 26.056,
      longitude: 119.1981,
      iconPath: '/img/location.png',
      name: 'T.I.T 创意园'
    },
    {
      id: 2,
      latitude: 26.050,
      longitude: 119.1981,
      iconPath: '/img/location.png',
      name: 'T.I.T 创意园'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        console.log(res.authSetting);
        if (res.authSetting["scope.userInfo"] == true) {
          this.setData({
            loginflag: 1
          })
        }
        if (this.data.loginflag == 1) {
          wx.login({
            success: r => {
              if (r.code) {
                wx.request({
                  url: app.globalData.URL + '/user/login',
                  method: 'GET',
                  data: {
                    "code": r.code
                  },
                  success: function (res) {
                    console.log(res.data)
                    //console.log(res.header["S-TOKEN"])
                    wx.setStorage({
                      key: 'userTOKEN',
                      data: res.header["S-TOKEN"],
                    })
                  },
                  fail: function (res) {
                    console.log(res.data.text)
                  }
                })
              }
            }
          })
        }
      }
    })
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

  changeName: function() {
    wx.navigateTo({
      url: '../demo/index',
    })
  },
  
  toReport: function() {
    wx.navigateTo({
      url: '../report/report',
    })
  },

  getUserInfo: function (e) {
    wx.login({
      success: r => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (r.code) {
          // 获取用户信息
          wx.getUserInfo({
            success: res => {
              this.setData({
                loginflag: 1
              })
              wx.request({
                url: app.globalData.URL + '/user/oauth',
                method: 'POST',
                data: {
                  code: r.code,
                  encryptedData: res.encryptedData,
                  ivStr: res.iv
                },
                success: function (res) {
                  console.log(res.data.text)
                },
                fail: function (res) {
                  console.log(res.data.text)
                }
              })
            },
            fail: res => {
              wx.showModal({
                title: 'lxGG写的好辛苦',
                content: '授权一个吧',
              })
            }
          })

          wx.getLocation({
            success: res => {
              this.setData({
                latitude: res.latitude,
                longitude: res.longitude,
                markers: marks
              })
              // console.log(that.data.markers);
            },
          })

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  }
})
