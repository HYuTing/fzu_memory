// components/recordcard/recordcard.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id: Number,
    avatarUrl: {
      type: String,
      value: []
    },
    nickName: {
      type: String,
      value: []
    },
    updateTime: {
      type: String,
      value: []
    },
    content: {
      type: String,
      value: []
    },
    imgUrl: {
      type: String,
      value: []
    },
    wxifcondition: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    condition: 0,
    deleteflag: true
  },

  attached: function () {
    // console.log('在这里查看状态' + this.properties.wxifcondition)
    this.setData({
      condition: this.properties.wxifcondition
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail: function (e) {
      var ids = this.properties.id;
      console.log(ids);
      wx.navigateTo({
        url: '../detail/detail?id=' + ids
      })
    },
    
    delete: function(e) {
      var that = this;
      var tid = this.properties.id;
      console.log(tid);

      wx.showModal({
        title: '提示',
        content: '是否确定删除该时光？',
        confirmText: '删除',
        confirmColor: '#F56C6C',
        success: function() {
          that.setData({
            deleteflag: false
          });
          wx.request({
            url: app.globalData.URL + '/time/delete',
            method: 'GET',
            header: {
              "S-TOKEN": wx.getStorageSync("userTOKEN"),
              "timeId": tid
            },
            success: function (res) {
              
            }
          })
        }
      })
    }

  }
})
