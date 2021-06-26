import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelList: [], //视频列表数据
    navId: '', //点击了哪个标签id
    videoList:[],//标签下对应的视频数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取标签数据
    this.getLabels()

  },
  //获取标签数据
  async getLabels() {
    let result = await request('/video/group/list')
    let labelList = result.data.slice(0, 14)
    if (!labelList.length) return
    this.setData({
      labelList,
      navId: labelList[0].id,
    })
    this.getVideoList(this.data.navId)
  },
  //点击标签逻辑
  tapLabel(event) {
    wx.showLoading({
      title: '正在加载中',
      mask: true,
    })
    this.setData({
      navId: event.currentTarget.dataset.type,
    })
    this.getVideoList(this.data.navId)
  },
  //获取视频标签下对应的视频数据
  async getVideoList(navId){
    let result = await request('/video/group',{id: navId})
    let videoList = result.datas.map((item,index)=>{return  Object.assign(item,{id:index})})
    this.setData({
      videoList
    })
    wx.hideLoading()
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