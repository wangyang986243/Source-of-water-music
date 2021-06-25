let startY = 0; //手指开始移动的位置
let moveY =0;//手指最终移动的位置
let moveDistance = 0; //手指移动的距离
Page({
  /**
   * 页面的初始数据
   */
  data: {
    coverTransform:'translateY(0)',//动画平移
    coverTransition :'',//过渡效果
    userInfo:{},//用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
    //用户没登录==>终止
    if(!userInfo) return
    this.setData({
      userInfo:JSON.parse(userInfo)
    })
  },
  // 手指移动开始
  bindtouchstart(event){
    startY = event.touches[0].clientY
    //给过渡效果置为默认值，防止手指移动结束后，添加修改后过度效果
    this.setData({
      coverTransition :''
    })
  },
  // 手指移动中
  bindtouchmove(event){
    moveY = event.touches[0].clientY
    //计算手指移动的距离
    moveDistance = moveY- startY

    if(moveDistance<0) return  //移动距离小于0  终止操作
    if(moveDistance > 80) moveDistance = 80  // 移动距离大于80 则位移距离设置为80
    this.setData({
      coverTransform:`translateY(${moveDistance}rpx)`
    })
  },
  // 手指移动结束
  bindtouchend(){
    // 手指移动结束，默认恢复原状
    this.setData({
      coverTransform:'translateY(0)',
      coverTransition:'transform 1s linear'
    })
  },
  //点击头像跳转登录页
  toLogin(){
    wx.navigateTo({
      url:'/pages/login/login'
    })
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