function Person(id, latitude, longitude, name) {
  this.id = id;
  this.latitude = latitude;
  this.longitude = longitude;
  this.iconPath = '/img/location.png';
}

var marks = new Array();
var i;

// for (i = 1; i <= 10; i++) {
//   marks.push(new Person(i, 26.050 + i / 10, 119.1981 + i / 10));
// }

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
  onLoad: function (options) {
    var that = this
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
                    var tokennew;

                    wx.setStorage({
                      key: 'userTOKEN',
                      data: res.header["S-TOKEN"],
                    })

                    tokennew = res.header["S-TOKEN"];

                    wx.request({
                      url: app.globalData.URL + '/time/map',
                      method: 'GET',
                      header: {
                        "S-TOKEN": '' + tokennew
                      },
                      success: r2 => {
                        var marksdata = r2.data.data;
                        for (i = 0; i < marksdata.length; i++) {
                          marksdata[i].iconPath = '/img/location.png';
                          //marks.push(obj);
                        }
                        that.setData({
                          markers: marksdata,
                          hasmarks: true
                        })
                        console.log(that.data.markers)
                        console.log('hlxsz' + that.data.hasmarks)

                      }
                    })

                  },
                  fail: function (res) {
                    console.log('登录失败')
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
      url: '../test/index',
    })
  },
  
  tohomepage: function() {
    wx.navigateTo({
      url: '../homepage/homepage',
    })
  },

  toranklist: function() {
    wx.navigateTo({
      url: '../ranklist/ranklist',
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
                  wx.setStorage({
                    key: 'userTOKEN',
                    data: res.header["S-TOKEN"],
                  })
                  console.log(res)
                },
                fail: function (res) {
                  console.log('请求失败')
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
                longitude: res.longitude
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
