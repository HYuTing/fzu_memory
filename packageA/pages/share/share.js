//share.js
const app = getApp()
Page({
  data: {
    imageBg: "../../../img/test.jpg",//背景图片
    imageHead: "../../../img/user-head.jpg",//头像
    imageEwm: "../../../img/logo.jpg",//二维码
    username: "Loutloi",//用户名
    text: "Now is 2:00am, it's time to sleep!",//文字说明
    ids: ""
    
  },
  onLoad: function (options) {
    var that = this;
    //console.log(options);
    var timeId = options.id;
    console.log(timeId)
    that.setData({
      ids: options.id
    });
    wx.request({
      url: app.globalData.URL + '/time/detail/' + timeId,
      method: 'GET',
      header: {
        "S-TOKEN": wx.getStorageSync("userTOKEN")
      },
      success: function(res) {
        console.log(res);
        that.setData({
          imageBg: res.data.data.imgUrl,
          imageHead: res.data.data.avatarUrl,
          username: res.data.data.nickName
        })
        console.log('='+that.data.username);
        var size = that.setCanvasSize();//动态设置画布大小
        that.createNewImg();
          
      }
    });
  },
    // 页面初始化 options为页面跳转所带来的参数

  save: function() {
    var that = this;
    var img = that.data.imagePath;
    wx.downloadFile({
      url: img,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res)
            wx.navigateTo({
              url: '../detail/detail?id=' + that.data.ids
            });
          },
          fail: function (res) {
            console.log(res)
            console.log('fail')
          }
        })
      },
      fail: function () {
        console.log('fail')
      }
    })
    
  },
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750;//画布宽度
      var scaleH = 1000 / 750;//生成图片的宽高比例
      var width = res.windowWidth;//画布宽度
      var height = res.windowWidth * scaleH;//画布的高度
      size.w = width;
      size.h = height;

    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  //将1绘制到canvas的固定
  setUsername: function (context,name) {
    let that = this;
    var size = that.setCanvasSize();
    var textFir = name;
    console.log(textFir);
    context.setFontSize(16);
    context.setTextAlign("center");
    context.setFillStyle("black");
    //context.fillText(textFir, size.w * 0.12, size.h * 0.296);
    context.fillText(textFir, size.w * 0.20, size.h * 0.34);
    context.stroke();
  },
  //将2绘制到canvas的固定
  nextText: function(context){
    let that = this;
    var text1 = '我在福大时光机发布了一段新时光,';
    var text2 = "长按扫码查看详情吧！";
    var size = that.setCanvasSize();
    context.setFontSize(10)
    context.setFillStyle("#bfbfbf")
    context.fillText(text1, size.w * 0.27, size.h*0.34 + 0 * 16);
    context.fillText(text2, size.w * 0.198, size.h * 0.34 + 1 * 16);
  },
  drawHead: function(contex,img) {
    let that = this;
    var size = that.setCanvasSize();
    var avatarurl_width = 80;    //绘制的头像宽度
    var avatarurl_heigth = 80;   //绘制的头像高度
    var avatarurl_x = size.w * 0.098;   //x
    var avatarurl_y = size.h * 0.1;   //y
    console.log(avatarurl_x);
    contex.save();
    contex.beginPath(); //开始绘制
    console.log(avatarurl_y);
    //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
    contex.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
    contex.clip();//剪切
    contex.drawImage(img, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片
    contex.restore(); //恢复之前保存的绘图上下文
  },

drawTextVertical:function(context, text, x, y) {
    var arrText = text.split('');
    var arrWidth = arrText.map(function (letter) {
      return 16;
    });

    var align = context.textAlign;
    var baseline = context.textBaseline;

    if(align == 'left') {
  x = x + Math.max.apply(null, arrWidth) / 2;
} else if (align == 'right') {
  x = x - Math.max.apply(null, arrWidth) / 2;
}
if (baseline == 'bottom' || baseline == 'alphabetic' || baseline == 'ideographic') {
  y = y - arrWidth[0] / 2;
} else if (baseline == 'top' || baseline == 'hanging') {
  y = y + arrWidth[0] / 2;
}

context.textAlign = 'center';
context.textBaseline = 'middle';

// 开始逐字绘制
arrText.forEach(function (letter, index) {
  // 确定下一个字符的纵坐标位置
  var letterWidth = arrWidth[index];
  // 是否需要旋转判断
  var code = letter.charCodeAt(0);
  if (code <= 256) {
    context.translate(x, y);
    // 英文字符，旋转90°
    context.rotate(90 * Math.PI / 180);
    context.translate(-x, -y);
  } else if (index > 0 && text.charCodeAt(index - 1) < 256) {
    // y修正
    y = y + arrWidth[index - 1] / 2;
  }
  context.fillText(letter, x, y);
  // 旋转坐标系还原成初始态
  context.setTransform(1, 0, 0, 1, 0, 0);
  // 确定下一个字符的纵坐标位置
  var letterWidth = arrWidth[index];
  y = y + letterWidth;
});
// 水平垂直对齐方式还原
context.textAlign = align;
context.textBaseline = baseline;
},

  lastText: function (context,text,x,y) {
  let that = this;
  var size = that.setCanvasSize();
  var textFir = text;
  console.log(textFir);
  context.setFontSize(12);
  context.setTextAlign("center");
  context.setFillStyle("#bfbfbf");
  this.drawTextVertical(context, textFir, x, y);
},

  /*downloadImages: function () {

    let that = this;
    wx.downloadFile({  //背景图
      url: that.data.imageBg,
      success: function (res) {
       
        wx.downloadFile({  //内容缩略图
          url: that.data.imageHead,
          success: function (res1) {
            wx.downloadFile({
              url: that.data.imageEwm,
              success: function (res2) {//  小程序二维码图
                that.createNewImg(res.tempFilePath, res1.tempFilePath, res2.tempFilePath);
              },
              fail: function () {
              }
            });
          }
        });
      }
    })
  },*/


  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function (imageZw, imageHead, imageEwm) {
    var that = this;
    var size = that.setCanvasSize();
    var context = wx.createCanvasContext('myCanvas');
    //var path = "../../img/test2.jpg";
    var imageHead = that.data.imageHead;
    var imageEwm = that.data.imageEwm;
    var imageZw = that.data.imageBg;
    var imageWrite = "../../../img/write.png";
    var name = that.data.username;
    var texts = that.data.text;
    console.log(that.data.username);
    //context.drawImage(path, 0, 0, size.w, size.h);
    context.setFillStyle('#ffffff');
    context.fillRect(0, 0, size.w, size.h);
    context.drawImage(imageZw, 0, size.h *0.566, size.w * 0.8, size.w * 0.5);
    this.drawHead(context, imageHead);
    this.setUsername(context,name);
    //this.nextText(context);
    this.lastText(context, "我在福大时光机", size.w * 0.52, size.h * 0.20);
    this.lastText(context, "发布了一段新时光", size.w * 0.58, size.h * 0.20);
    this.lastText(context, "长按扫码查看详情吧", size.w * 0.64, size.h * 0.20);
    //this.lastText(context);
    context.drawImage(imageEwm, size.w * 0.080, size.h * 0.41, size.w * 0.26, size.w * 0.26);
    context.drawImage(imageWrite, size.w * 0.54, size.h * 0.09, size.w * 0.08, size.w * 0.08);
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 1800
    });
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath);
          that.setData({
            imagePath: tempFilePath,
            //canvasHidden: false,
            //maskHidden: true,
          });
          //将生成的图片放入到《image》标签里
          
          /*wx.previewImage({
            current: img, // 当前显示图片的http链接
            urls: [img] // 需要预览的图片http链接列表
          })*/
      
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 2000);
  },


})