const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leaveInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      leaveInfo: app.globalData.staffInfo.leaves
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    const that = this;
    wx.request({
      url: app.globalData.url + "slogin",
      data: {
        phone: app.globalData.staffInfo.phone,
        name: app.globalData.staffInfo.name,
        password: app.globalData.staffInfo.password
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        if (res.data != null && res.data.code == 200) {
          app.globalData.staffInfo = res.data.data
          wx.stopPullDownRefresh({
            success: (res) => {
              wx.showToast({
                title: '刷新成功！',
                icon:'success'
              })
              that.onLoad()
            },
          })
        } else {
          wx.showToast({
            title: '刷新失败!',
            icon: "none"
          });
        }
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})