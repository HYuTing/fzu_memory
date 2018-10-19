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
    var that = this
    wx.getImageInfo({
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539957722096&di=036e1846dc0fe9a028d41a8e21ee0f43&imgtype=0&src=http%3A%2F%2Fpic31.photophoto.cn%2F20140417%2F0022005417481244_b.jpg',
      success: function(res) {
        var imgPath = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539957722096&di=036e1846dc0fe9a028d41a8e21ee0f43&imgtype=0&src=http%3A%2F%2Fpic31.photophoto.cn%2F20140417%2F0022005417481244_b.jpg'
        var bgImgPath = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539957722096&di=036e1846dc0fe9a028d41a8e21ee0f43&imgtype=0&src=http%3A%2F%2Fpic31.photophoto.cn%2F20140417%2F0022005417481244_b.jpg'
        const ctx = wx.createCanvasContext('myCanvas')
        ctx.drawImage(res.path, 0, 0, 600, 900)

        ctx.setFillStyle('white')
        ctx.fillRect(0, 520, 600, 280);

        ctx.drawImage(imgPath, 30, 550, 60, 60);
        ctx.drawImage(bgImgPath, 30, 550, 60, 60);
        ctx.drawImage(imgPath, 410, 610, 160, 160);

        ctx.setFontSize(28)
        ctx.setFillStyle('#6F6F6F')
        ctx.fillText('妖妖灵', 110, 590)

        ctx.setFontSize(30)
        ctx.setFillStyle('#111111')
        ctx.fillText('宠友们快来围观萌宠靓照', 30, 660)
        ctx.fillText('我在萌爪幼稚园', 30, 700)

        ctx.setFontSize(24)
        ctx.fillText('长按扫码查看详情', 30, 770)
        ctx.draw()
      }
    }),
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 600,
        height: 800,
        destWidth: 600,
        destHeight: 800,
        canvasId: 'myCanvas',
        success: function (res) {
          console.log(res.tempFilePath);
          that.setData({
            shareImgSrc: res.tempFilePath
          })

        },
        fail: function (res) {
          console.log(res)
        }
      }),
      wx.saveImageToPhotosAlbum({
        filePath: that.data.shareImgSrc,
        success(res) {
          wx.showModal({
            title: '存图成功',
            content: '图片成功保存到相册了，去发圈噻~',
            showCancel: false,
            confirmText: '好哒',
            confirmColor: '#72B9C3',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
              }
              that.hideShareImg()
            }
          })
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