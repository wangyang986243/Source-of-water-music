import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelList: [], //视频列表数据
    navId: '', //点击了哪个标签id
    videoList:[],//标签下对应的视频数据
    videoId:'',//点击了哪个视频
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

  //开始/继续播放视频
  playVideo(event){
    /**
     * 问题：多个视频同时播放的问题
     * 需求：
     *  1. 在点击播放事件中需要找到上一个播放的视频
     *  2. 在播放新视频之前关闭上一个正在播放的视频
     * 关键：
     *  1. 如何找到上一个视频的实例对象
     *  2. 如何确认点击播放的视频和正在播放的视频是不是同一个视频
     * 
     * 单例模式：
     *  1. 需要创建多个对象的场景下，通过一个变量接收，始终保持只有一个对象
     *  2.节省内存空间
    */
    let vid = event.currentTarget.id
    this.data.vidCopy = vid
    //关闭上一个播放的视频
    this.vid !== vid && this.videoContext && this.videoContext.stop();
    // this.vid = vid;
    // this.setData({
    //   videoId:vid
    // })
   
    //创建控制视频标签的实例对象
    this.videoContext = wx.createVideoContext(vid);
    this.videoContext.play()
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