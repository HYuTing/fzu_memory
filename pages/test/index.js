//index.js
var app = getApp();
//获取应用实例

var arr = new Array;
var currennum = 2;

function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  console.log(Y + M + D + h + m + s);
  return Y + M + D;
}

Page({
  data: {
    marginTop: '',
    startX: 0, //开始移动时距离左
    endX: 0, //结束移动时距离左
    nowPage: 0, //当前是第几个个页面
    xinList: [
      {
        display: 0,
        scale: '',
        slateX: '',
        zIndex: 0,
        style: ''
      },
      {
        display: 0,
        scale: '',
        slateX: '',
        zIndex: 0,
        style: ''
      },
      {
        display: 0,
        scale: '',
        slateX: '',
        zIndex: 0,
        style: ''
      }
    ]
  },
  //事件处理函数

  onLoad: function (e) {
    var that = this
    this.setData({
      marginTop: app.globalData.height + 10
    })
    this.checkPage(this.data.nowPage);

    wx.request({
      url: app.globalData.URL + '/time/explore',
      method: 'GET',
      header: {
        "S-TOKEN": wx.getStorageSync("userTOKEN")
      },
      success: function (res) {
        console.log(res)
        var sjc = res.data.data.updateTime;
        console.log(sjc);
        sjc = timestampToTime(sjc);

        arr = that.data.xinList;

        arr[0].nickName = res.data.data.nickName;
        arr[0].time = sjc;
        arr[0].avatarUrl = res.data.data.avatarUrl;
        arr[0].content = res.data.data.content;
        arr[0].imgUrl = res.data.data.imgUrl;
        arr[0].location = res.data.data.location;
        arr[0].praiseNum = res.data.data.praiseNum;
        arr[0].isPraise = res.data.data.isPraise;

      }
    })
    wx.request({
      url: app.globalData.URL + '/time/explore',
      method: 'GET',
      header: {
        "S-TOKEN": wx.getStorageSync("userTOKEN")
      },
      success: function (res) {
        console.log(res)
        var sjc = res.data.data.updateTime;
        console.log(sjc);
        sjc = timestampToTime(sjc);

        arr = that.data.xinList;

        arr[1].nickName = res.data.data.nickName;
        arr[1].time = sjc;
        arr[1].avatarUrl = res.data.data.avatarUrl;
        arr[1].content = res.data.data.content;
        arr[1].imgUrl = res.data.data.imgUrl;
        arr[1].location = res.data.data.location;
        arr[1].praiseNum = res.data.data.praiseNum;
        arr[1].isPraise = res.data.data.isPraise;

        that.setData({
          xinList: arr
        })
      }
    })
  },
  onReady: function () {
    
  },

  // like: function () {
  //   var praiseNum = this.data.praiseNum
  //   if (praiseNum == 0) {
  //     //表示没有点过赞
  //     this.setData({
  //       praiseNum: praiseNum + 1,
  //       like: 1
  //     })
  //   }
  //   else {
  //     this.setData({
  //       praiseNum: praiseNum - 1,
  //       like: 0
  //     })
  //   }

  //   var thistimeid = this.data.timeId
  //   wx.request({
  //     url: app.globalData.URL + '/time/praise',
  //     method: 'GET',
  //     header: {
  //       "S-TOKEN": wx.getStorageSync("userTOKEN")
  //     },
  //     data: {
  //       timeId: thistimeid
  //     },
  //     success: function (res) {
  //       console.log(res.data.text);
  //     }
  //   })
  // },

  // collect: function () {
  //   var collect = this.data.isCollect
  //   if (collect == 0) {
  //     //表示没有收藏过
  //     this.setData({
  //       isCollect: 1
  //     })
  //   }
  //   else {
  //     this.setData({
  //       isCollect: 0
  //     })
  //   }

  //   var thistimeid = this.data.timeId
  //   wx.request({
  //     url: app.globalData.URL + '/time/collect',
  //     method: 'GET',
  //     header: {
  //       "S-TOKEN": wx.getStorageSync("userTOKEN")
  //     },
  //     data: {
  //       timeId: thistimeid
  //     },
  //     success: function (res) {
  //       console.log(res.data.text);
  //     }
  //   })
  // },

  //手指触发开始移动
  moveStart: function (e) {
    var startX = e.changedTouches[0].pageX;
    this.setData({
      startX: startX
    });
  },
  //手指触摸后移动完成触发事件
  moveItem: function (e) {
    var that = this;

    var numaa = currennum%3;

    wx.request({
      url: app.globalData.URL + '/time/explore',
      method: 'GET',
      header: {
        "S-TOKEN": wx.getStorageSync("userTOKEN")
      },
      success: function (res) {
        console.log(res)
        var sjc = res.data.data.updateTime;
        console.log(sjc);
        sjc = timestampToTime(sjc);

        arr = that.data.xinList;

        arr[numaa].nickName = res.data.data.nickName;
        arr[numaa].time = sjc;
        arr[numaa].avatarUrl = res.data.data.avatarUrl;
        arr[numaa].content = res.data.data.content;
        arr[numaa].imgUrl = res.data.data.imgUrl;
        arr[numaa].location = res.data.data.location;
        arr[numaa].praiseNum = res.data.data.praiseNum;
        arr[numaa].isPraise = res.data.data.isPraise;

        that.setData({
          xinList: arr
        })

        currennum ++;
      }
    })

    var endX = e.changedTouches[0].pageX;
    this.setData({
      endX: endX
    });

    //计算手指触摸偏移剧距离
    var moveX = this.data.startX - this.data.endX;

    //向左移动
    if (moveX > 20) {

      var obj = new Object();
      obj.display = 0
      obj.scale = ''
      obj.slateX = ''
      obj.zIndex = 0
      obj.style = ''

      var arr = this.data.xinList;
      // console.log(arr.length);
      // arr.push(obj);

      this.setData({
        xinList: arr
      })

      that.setData({
        nowPage: that.data.nowPage + 1
      });
      this.checkPage(this.data.nowPage);
    }


  },
  // 页面判断逻辑,传入参数为当前是第几页 
  checkPage: function (index) {
    index = index%3;
    // console.log("i->>" + index);
    //信列表数据
    var data = this.data.xinList;
    var that = this;
    var m = 1;
    for (var i = 0; i < data.length; i++) {
      //先将所有的页面隐藏
      var disp = 'xinList[' + i + '].display';
      var sca = 'xinList[' + i + '].scale';
      var slateX = 'xinList[' + i + '].slateX';
      var zIndex = 'xinList[' + i + '].zIndex';
      var style = 'xinList[' + i + '].style';
      that.setData({
        [disp]: 0,
        [style]: "display:block",
      });
      //向左移动上一个页面
      if (index!=0 && i == (index - 1)) {
        that.setData({
          [slateX]: '-120%',
          [disp]: 1,
          [zIndex]: 2,

        });
      }else if(index==0){
        that.setData({
          [slateX]: '-120%',
          [disp]: 1,
          [zIndex]: 2,
        });
      }

      if(i==0 && index==2){
        console.log('123');
        that.setData({
          [disp]: 1
        });
        this.setData({
          [sca]: 0.8, 
          [slateX]: '20px',
          [zIndex]: -1,
        });
      }

      if (i == index || i == index+1 ) {
        //显示最近的2封
        that.setData({
          [disp]: 1
        });
        //第一封信
        if (m == 1) {
          this.setData({
            [sca]: 1,
            [slateX]: 0,
            [zIndex]: 1,
          });
        }
        //第二封信
        else if (m == 2) {
          this.setData({
            [sca]: 0.8,
            [slateX]: '20px',
            [zIndex]: -1,
          });
        }
        m++;
      }
    }
  }
})