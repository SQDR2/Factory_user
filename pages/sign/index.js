var util = require('../../utils/util.js');
var app = getApp();
import dayjs from 'dayjs'
Page({
  data: {
    currTime: '', //当前时间（显示时钟）
    weekday: '',
    showText: '',
    // 打卡按钮状态 0:未按压 1：按压 2：完成 -1:不可用
    btnState: 0, //默认不可用
    hiddenLoading: false,
    hiddenMyInfo: true
  },


  onReady: function () {
    // 获取用户IP地址


  },

  // 初始化
  onLoad: function () {
    const that = this;
    // 获取当前设备IP地址 判断是否到达当前签到地点
    wx.request({
      url: 'https://api.ipify.org',
      success: function (res) {
        const ip_address = res.data;
        // 获取设备所在地理位置信息
        wx.request({
          url: `http://api.ipstack.com/${ip_address}?access_key=78024e0b03b59b9adf0af793977555a3`,
          success: function (res) {
            console.log(res);
            const { city, region_name, country_name } = res.data;
            console.log(city);
            if (city !== 'Changsha') {
              that.setData({
                btnState:-1
              })
            }
          }
        });
      }
    });
    if (app.globalData.staffInfo) {
      this.setData({
        hiddenLoading: true,
        hiddenMyInfo: false
      })
    }
    let len = app.globalData.staffInfo.attendance.length
    if (app.globalData.staffInfo.attendance[len - 1]) {
      //判断有无打卡
      if (dayjs(app.globalData.staffInfo.attendance[len - 1].signInTime).isSame(dayjs(), 'day')) {
        this.setData({
          btnState: 2
        })
      }
    }
    this.showTimer();
  },

  // 监听页面显示
  onShow: function () {

  },

  signTask: function () {
    if (this.data.btnState === 0) {
      this.setData({
        btnState: 1
      })
      if (this.data.btnState === 1) {
        wx.request({
          url: app.globalData.url +'sign',
          method: 'POST',
          data: {
            _id: app.globalData.staffInfo._id
          },
          success: (res) => {
            console.log(res);
            if (res.data.code === 200) {
              this.setData({
                btnState: 2
              })
              wx.showToast({
                title: res.data.msg,
              })
            } else {
              wx.showToast({
                title: res.data.msg,
              })
            }
          }
        })
      }
    }else if(this.data.btnState === -1){
      wx.showToast({
        title: '未到达签到地点',
        icon: 'error',
        duration: 1000//持续的时间
      })
    }
     else {
      wx.showToast({
        title: '已打卡请勿重复',
        icon: 'success',
        duration: 1000//持续的时间
      })
    }
  },

  //显示时钟
  showTimer: function () {
    var that = this;
    const week = {
      'Monday': "星期一",
      'Tuesday': "星期二",
      'Wednesday': "星期三",
      'Thursday': "星期四",
      'Friday': "星期五",
      'Saturday': "星期六",
      'Sunday': "星期日"
    }
    const today = dayjs();
    const formattedDate = today.format('YYYY-MM-DD');
    const dayOfWeek = today.format('dddd');
    // console.log(formattedDate,dayOfWeek);
    var d = setInterval(function () {
      var TIME = util.formatTime(new Date());
      that.setData({
        currTime: TIME.substring(10), //只要时分秒
        weekday: week[dayOfWeek],
        showText: formattedDate
      });
    }, 1000);
  },

  onPullDownRefresh: function () {
    wx.showLoading({
      title: '请稍候...'
    })
  }

});