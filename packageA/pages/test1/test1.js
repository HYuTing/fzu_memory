const app = getApp()

var is_1_height, is_1_width, is_2_height, is_2_width, is_img0_width, is_img0_height, is_img1_width, is_img1_height;
var item = 0;
var fangxiang;
Page({
  data: {
    marginTop: '',
    index_0: 3,
    avatarUrl: '../../img/newtime.png',
    nickName: ''
  },

  onShow: function () {
    this.animation1 = this.animation2 = this.animation0 = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
  },
  bindtap_img: function (e) {
    var that = this;
    switch (item) {
      case 0:
        if (e.target.id == 0) {
          this.setData({
            index_0: 3,
          })
          item = 0;
        } else if (e.target.id == 1) {
          this.setData({
            index_2: 0,
            index_0: 2,
            index_1: 3,
          })
          fangxiang = 'right';
          item = 1;
        } else if (e.target.id == 2) {
          this.setData({
            index_1: 0,
            index_0: 2,
            index_2: 3,
          })
          fangxiang = 'left';
          item = 2
        }
        break;
      case 1:
        if (e.target.id == 0) {
          this.setData({
            index_2: 0,
            index_1: 2,
            index_0: 3,
          })
          item = 0
        } else if (e.target.id == 1) {
          this.setData({
            index_1: 3,
          })
          fangxiang = 'right';
          item = 1
        } else if (e.target.id == 2) {
          this.setData({
            index_0: 0,
            index_1: 2,
            index_2: 3,
          })
          fangxiang = 'left';
          item = 2
        }
        break;
      case 2:
        if (e.target.id == 0) {
          this.setData({
            index_0: 3,
            index_2: 2,
            index_1: 0,
          })
          item = 0
        } else if (e.target.id == 1) {
          this.setData({
            index_0: 0,
            index_2: 2,
            index_1: 3,
          })
          fangxiang = 'right';
          item = 1
        } else if (e.target.id == 2) {
          this.setData({
            index_2: 3,
          })
          fangxiang = 'left';
          item = 2
        }
        break;
      default:
        console.log('11111')
    }
    if (e.target.id == 1) {
      // 先旋转同时放大，然后平移
      this.animation0.scale(is_img1_width / is_img0_width, is_img1_height / is_img0_height).translateX(is_1_width).step()
      this.setData({
        animationData0: this.animation0.export(),
      })
      this.animation1.scale(is_img0_width / is_img1_width, is_img0_height / is_img1_height).translateX(is_1_height).step()
      this.setData({
        animationData1: this.animation1.export(),
      })
      this.animation2.scale(1, 1).translateX(-is_2_height).step()
      this.setData({
        animationData2: this.animation2.export(),
      })
    } else if (e.target.id == 2) {
      // 先旋转同时放大，然后平移
      this.animation0.scale(is_img1_width / is_img0_width, is_img1_height / is_img0_height).translateX(-is_1_width).step()
      this.setData({
        animationData0: this.animation0.export(),
      })
      this.animation1.scale(1, 1).translateX(is_2_height).step()
      this.setData({
        animationData1: this.animation1.export(),
      })
      this.animation2.scale(is_img0_width / is_img1_width, is_img0_height / is_img1_height).translateX(-is_1_height, is_2_width).step()
      this.setData({
        animationData2: this.animation2.export(),
      })
    } else if (e.target.id == 0) {
      // 先旋转同时放大，然后平移
      this.animation0.scale(1, 1).translateX(0).step()
      this.setData({
        animationData0: this.animation0.export(),
      })
      this.animation1.scale(1, 1).translateX(0).step()
      this.setData({
        animationData1: this.animation1.export(),
      })
      this.animation2.scale(1, 1).translateX(0).step()
      this.setData({
        animationData2: this.animation2.export(),
      })
    }
  },

  onLoad: function (options) {
    this.setData({
      marginTop: app.globalData.height + 20,
    })
    console.log(this.data.marginTop);
    
    wx.createSelectorQuery().select('#is_height_1').boundingClientRect(function (rect) {
      is_1_width = Number(rect.width)
      is_1_height = Number(rect.height)  // 节点的宽度
    }).exec();
    wx.createSelectorQuery().select('#is_height_2').boundingClientRect(function (rect) {
      is_2_width = Number(rect.width)  // 节点的宽度
      is_2_height = Number(rect.height)  // 节点的宽度

    }).exec();
    wx.createSelectorQuery().select('.img0').boundingClientRect(function (rect) {
      is_img0_width = Number(rect.width)  // 节点的宽度
      is_img0_height = Number(rect.height)  // 节点的宽度
      console.log(is_img0_width)
    }).exec();
    wx.createSelectorQuery().select('.img1').boundingClientRect(function (rect) {
      is_img1_width = Number(rect.width)  // 节点的宽度
      is_img1_height = Number(rect.height)  // 节点的宽度
    }).exec();
  },
})  