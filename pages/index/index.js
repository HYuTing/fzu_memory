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

Page({
  data: {
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
    var that = this;
    wx.getLocation({
      success: function(res) {
        console.log(res);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          // 'markers[0].latitude': res.latitude,
          // 'markers[0].longitude': res.longitude
          markers: marks
        })
        // console.log(that.data.markers);
      },
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
  }
  
})
