var app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false, //是否用户已授权读取个人信息
    canIUser: wx.canIUse('button.open-type.getUserInfo')
  },

  // 初始化设置
  onLoad: function () {
    // app.globalData.url = 'http://127.0.0.1:2580/'
    app.globalData.url = "http://101.42.13.57:2580/"
    var that = this;
    app.getUserInfo(function (userinfo) {
      if (userinfo) {
        that.setData({
          userInfo: userinfo,
          hasUserInfo: true
        });
      }
    });
  },

  onShow: function () {

  },

  bindSubmit: function (e) {
    var that = this;
    var mobile = e.detail.value.Mobile;
    var realName = e.detail.value.RealName;
    if (realName == "") wx.showToast({ title: "真实姓名不为空", icon: "none" });
    else if (mobile == "") wx.showToast({ title: "手机不为空", icon: "none" });
    else if (mobile.length != 11) wx.showToast({ title: "请输入11位手机号码", icon: "none" });
    else {
      wx.request({
        url: app.globalData.url + "slogin",
        data: {
          phone: mobile,
          name: realName,
          HeaderPhoto: that.data.userInfo.avatarUrl,
          password: e.detail.value.pw
        },
        method: 'POST',
        success: function (res) {
          console.log(res);
          if (res.data != null && res.data.code == 200) {
            app.globalData.staffInfo = res.data.data
            wx.showToast({
              title: '登录成功！',
              success: function () {
                wx.switchTab({
                  url: '../sign/index'
                })
              }
            });
          } else {
            wx.showToast({
              title: '登录失败!',
              icon: "none"
            });
          }
        }
      });

    }
  }
})