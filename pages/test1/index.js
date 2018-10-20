//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    animationData: {},
    cardInfoList: [{
      cardUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540062039271&di=51f97f85f31e484be666cf285cad13a9&imgtype=0&src=http%3A%2F%2F08imgmini.eastday.com%2Fmobile%2F20181020%2F20181020005629_d41d8cd98f00b204e9800998ecf8427e_1_mwpm_03201609.jpg',
      cardInfo: {
        cardTitle: '你不知道的花事',
        cardInfoMes: ['一月一送，浪漫节日送浪漫花', '一月两送，有趣节日送奇异花', '一月四送，有你在每天都是最好的节日']
      }
    }, {
      cardUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540062039271&di=51f97f85f31e484be666cf285cad13a9&imgtype=0&src=http%3A%2F%2F08imgmini.eastday.com%2Fmobile%2F20181020%2F20181020005629_d41d8cd98f00b204e9800998ecf8427e_1_mwpm_03201609.jpg',
      cardInfo: {
        cardTitle: '你不知道的花事',
        cardInfoMes: ['一月一送，浪漫节日送浪漫花', '一月两送，有趣节日送奇异花', '一月四送，有你在每天都是最好的节日']
      }
    }, {
      cardUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540062039271&di=51f97f85f31e484be666cf285cad13a9&imgtype=0&src=http%3A%2F%2F08imgmini.eastday.com%2Fmobile%2F20181020%2F20181020005629_d41d8cd98f00b204e9800998ecf8427e_1_mwpm_03201609.jpg',
      cardInfo: {
        cardTitle: '你不知道的花事',
        cardInfoMes: ['一月一送，浪漫节日送浪漫花', '一月两送，有趣节日送奇异花', '一月四送，有你在每天都是最好的节日']
      }
    }]
  },
  //事件处理函数
  slidethis: function (e) {
    console.log(e);
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'cubic-bezier(.8,.2,.1,0.8)',
    });
    var self = this;
    this.animation = animation;
    this.animation.translateY(-420).rotate(-5).translateX(0).step();
    this.animation.translateY(62).translateX(25).rotate(0).step();
    this.setData({
      animationData: this.animation.export()
    });
    setTimeout(function () {
      var cardInfoList = self.data.cardInfoList;
      var slidethis = self.data.cardInfoList.shift();
      self.data.cardInfoList.push(slidethis);
      self.setData({
        cardInfoList: self.data.cardInfoList,
        animationData: {}
      });
    }, 350);
  },
  buythis: function (e) {
    console.log(e);
    app.buyDetail = this.data.cardInfoList[e.target.id];
    wx.navigateTo({
      url: '../detail/detail'
    });
  },
  onLoad: function () {
    
  }
})
