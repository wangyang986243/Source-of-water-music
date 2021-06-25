import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //输入手机号和密码事件
  handleInput(event) {
    let type = event.currentTarget.dataset.type
    this.setData({
      [type]: event.detail.value
    })
  },
  // 点击登录按钮
  async login() {
    let {
      phone,
      password
    } = this.data
    //校验手机号: 手机为空  手机格式不正确
    if (!phone) {
      wx.showToast({
        title: "手机号不能为空",
        icon: "none"
      })
      return
    }
    let phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: "手机号格式不正确",
        icon: "none"
      })
      return
    }
    //密码校验 密码不能为空
    if (!password) {
      wx.showToast({
        title: "密码不能为空",
        icon: "none"
      })
      return
    }

    //开始登录
    let result = await request('/login/cellphone', { phone, password })
    if (result.code == 200) {
      wx.showToast({
        title: "登录成功",
      })
      wx.setStorageSync('userInfo', JSON.stringify(result.profile))
      wx.reLaunch({
        url:'/pages/personal/personal'
      })
    } else if (result.code == 400) {
      wx.showToast({
        title: "手机号码错误",
        icon: "none"
      })
    } else if (result.code == 501) {
      wx.showToast({
        title: "帐号不存在",
        icon: "none"
      })
    } else if (result.code == 502) {
      wx.showToast({
        title: "密码错误",
        icon: "none"
      })
    } else {
      wx.showToast({
        title: "登入失败，请重新登录",
        icon: "none"
      })
    }
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

  }
})