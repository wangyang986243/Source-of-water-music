import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelList: [], //视频列表数据
    navId: '', //点击了哪个标签id
    videoList: [], //标签下对应的视频数据
    videoId: '', //点击了哪个视频
    videoUpdateTime: [], //视频点击的时间的数据[{id:***,time:***}]
    isRefresher:false,//下拉刷新标志
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
  async getVideoList(navId) {
    let result = await request('/video/group', {
      id: navId
    })
    let videoList = result.datas.map((item, index) => {
      return Object.assign(item, {
        id: index
      })
    })
    this.setData({
      videoList,
      isRefresher:false //关闭下拉刷新
    })
    wx.hideLoading()
  },

  //开始/继续播放视频
  playVideo(event) {
  /*
      问题： 多个视频同时播放的问题
    * 需求：
    *   1. 在点击播放的事件中需要找到上一个播放的视频
    *   2. 在播放新的视频之前关闭上一个正在播放的视频
    * 关键：
    *   1. 如何找到上一个视频的实例对象
    *   2. 如何确认点击播放的视频和正在播放的视频不是同一个视频
    * 单例模式：
    *   1. 需要创建多个对象的场景下，通过一个变量接收，始终保持只有一个对象，
    *   2. 节省内存空间
    * */
    
   let vid = event.currentTarget.id;
   // 关闭上一个播放的视频
   // this.vid !== vid && this.videoContext && this.videoContext.stop();
   // if(this.vid !== vid){
   //   if(this.videoContext){
   //     this.videoContext.stop()
   //   }
   // }
   // this.vid = vid;
   
   // 更新data中videoId的状态数据
   this.setData({
     videoId: vid
   })
   // 创建控制video标签的实例对象
   this.videoContext = wx.createVideoContext(vid);
   // 判断当前的视频之前是否播放过，是否有播放记录, 如果有，跳转至指定的播放位置
   let {videoUpdateTime} = this.data;
   let videoItem = videoUpdateTime.find(item => item.vid === vid);
   if(videoItem){
     this.videoContext.seek(videoItem.currentTime);
   }
   this.videoContext.play();
   // this.videoContext.stop();
  },
  //监听视频播放进度
  timeupdate(event) {
    let videoTimeObj = {vid: event.currentTarget.id, currentTime: event.detail.currentTime};
    let {videoUpdateTime} = this.data;
    /*
    * 思路： 判断记录播放时长的videoUpdateTime数组中是否有当前视频的播放记录
    *   1. 如果有，在原有的播放记录中修改播放时间为当前的播放时间
    *   2. 如果没有，需要在数组中添加当前视频的播放对象
    *
    * */
    let videoItem = videoUpdateTime.find(item => item.vid === videoTimeObj.vid);
    if(videoItem){ // 之前有
      videoItem.currentTime = event.detail.currentTime;
    }else { // 之前没有
      videoUpdateTime.push(videoTimeObj);
    }
    // 更新videoUpdateTime的状态
    this.setData({
      videoUpdateTime
    })
  
  },
  //视频播放结束
  bindended(event){
    let vid = event.currentTarget.id
    let {videoUpdateTime} = this.data;
    //获取播完视视频在videoUpdateTime的下标
    let index = videoUpdateTime.findIndex(item=>{return item.vid==vid})
    // 从videoUpdateTime截取掉已经播完的视频
    videoUpdateTime.splice(index,1)
    this.setData({
      videoUpdateTime
    })
  },
  //下拉刷新
  refresherrefresh(){
    this.getVideoList(this.data.navId)
  },
  //下拉触底
  scrolltolower(){
    console.log("触底了！")
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