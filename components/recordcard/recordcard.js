// components/recordcard/recordcard.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id: {
      type: Number,
        value: []
    },
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
    imgUrl: {
      type: String,
      value: []
    },
    condition: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      delete: function(e) {
        //var that = this;
        var tid = this.data.id;
        console.log(tid);
        /*wx.request({
          url: app.globalData.URL + '/time/delete',
          method: 'GET',
          header: {
            "S-TOKEN": "4836898a-4ad4-4ab6-b173-8cc5991cdaba",//wx.getStorageSync("userTOKEN")
            "timeId": tid
          },
          success: function (res) {
            
          }
        })*/
      }

  }
})
