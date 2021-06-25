// pages/index/index.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [], //轮播图数据
    recommendSongList: [], //推荐歌曲数据
    topList: [], //排行榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    //获取轮播图数据
    let bannerData = await request('/banner', {
      type: 2
    })
    //获取推荐歌单数据
    let recommendSongData = await request('/personalized', {
      limit: 15
    })
    this.setData({
      bannerList: bannerData.banners,
      recommendSongList: recommendSongData.result
    })
    //获取排行榜数据
    let topListData = []
    for (let i = 0; i < 5; i++) {
      let result = await request('/top/list', {
        idx: i
      })
      topListData.push({
        name: result.playlist.name,
        musics: result.playlist.tracks.slice(0, 3)
      })
    }
    this.setData({
      topList: topListData
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