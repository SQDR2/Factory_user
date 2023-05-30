var util = require('../../utils/util.js');
var app = getApp();

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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            method: 'GET',
            data: {
              appid: 'wxfa5c66c8d72f07d4',
              secret: '29ee2d206114d07ed84272c6e9144463',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            success: (res) => {
              console.log(res);
              app.globalData.openId = res.data.openid
            }
          })
        } else {
          console.log('登录失败！' + res)
        }
      }
    })
    wx.redirectTo({ //redirectTo 和 navigateTo ,switchTab
      url: '../login/login'
    })
  }
})