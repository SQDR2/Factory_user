const dayjs = require('dayjs');
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    dakaUser: {}, //会员
    hiddenLoading: false,
    hiddenMyInfo: true,
    leaveDay: dayjs().format('YYYY-MM-DD'),
    num: 0,
    reason: ''
  },

  // 初始化设置
  onLoad: function () { //只触发一次    

  },


  onShow: function () { //每次都会触发，保证读取的会员信息是实时的
    this.getDakaUser();
  },
  bindDateChange: function (e) {
    this.setData({
      leaveDay: e.detail.value
    })
  },
  bindLeaveNum: function (e) {
    this.setData({
      num: e.detail.value
    })
  },
  bindReason: function (e) {
    this.setData({
      reason: e.detail.value
    })
  },
  getDakaUser: function () {
    var that = this;
    if (app.globalData.dakaUser) {
      that.setData({
        hiddenLoading: true,
        hiddenMyInfo: false,
        dakaUser: app.globalData
      });
      console.log(this.data.dakaUser);
    }

  },
  leave: function () {
    wx.showModal({
      title: '申请',
      content: '确认请假？',
      success: (res) => {
        if(res.confirm){
          wx.request({
            url: app.globalData.url +'leave',
            data: {
              _id: app.globalData.staffInfo._id,
              leaveNum: this.data.num,
              reason: this.data.reason
            },
            method: 'POST',
            success: (res) => {
              if (res.data.code === 200) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'success'
                })
                this.setData({
                  num: 0,
                  leaveDay: dayjs().format('YYYY-MM-DD'),
                  reason: ''
                })
              } else {
                console.log(res);
                wx.showToast({
                  title: res.data.msg,
                  icon: 'error'
                })
              }
            }
          })
        }else if(res.cancel){
          wx.showToast({
            title: '已取消',
            icon:'none'
          })
        }
      }
    })
  },
  // onPullDownRefresh: function () {
  //   wx.showLoading({
  //     title: '请稍候...'
  //   })

  //   this.getDakaUser();
  // }

})