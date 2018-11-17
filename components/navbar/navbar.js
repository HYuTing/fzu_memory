// components/navbar/navbar.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navbarTitle: String,
    navbarColor: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: ''
  },

  attached: function() {
    this.setData({
      height: app.globalData.height
    })

    // console.log(app.globalData.height)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _navback() {
      wx.navigateBack()
    }
  }
})
