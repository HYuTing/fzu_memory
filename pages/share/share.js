// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getImageInfo({
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539957722096&di=036e1846dc0fe9a028d41a8e21ee0f43&imgtype=0&src=http%3A%2F%2Fpic31.photophoto.cn%2F20140417%2F0022005417481244_b.jpg',
      success: function(res) {
        const ctx = wx.createCanvasContext('shareCanvas')
        ctx.drawImage(res.path, 0, 0, 300, 450)
        ctx.draw()
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})