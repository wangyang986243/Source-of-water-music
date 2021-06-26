import config from './config'
//发送ajax请求
export default (url, data = {}, method = 'GET') => {
  return new Promise((resolve, reject) => {
    wx.request({
      url:config.host + url,//本地开发
      // url:config.mobileHost + url,//神卓外网 ==>内网穿透
      // url:config.mobileHost1 + url,//范哲西 ==>内网穿透
      data,
      method,
      header:{
        /*
        1 从本地获取cookies(数组)   wx.getStorageSync('cookies')
        2 从cookies数组中找到以 'MUSIC_U' 开头的数据 ，并获取他的下标
          wx.getStorageSync('cookies').findIndex(item => { return item.indexOf('MUSIC_U') != -1 })
        3 所以最后cookie 就是以'MUSIC_U' 开头的数据 
        4 这里最后用到了 三元判断  如果用户没有登入，则没有cookies这一项数据，只有登入的时候才有cookies，
            所以这做的原因是防止报错
        */ 
        cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies')[wx.getStorageSync('cookies').findIndex(item => { return item.indexOf('MUSIC_U') != -1 })]:''
      },
      success: (res) => {
        // if(res.data.code===301){
        //   wx.showToast({
        //     title: res.data.msg,
        //     icon: "none"
        //   })
        //   wx.navigateTo({
        //     url: '/pages/login/login',
        //   })
        // }

        //判断是不是登入接口的请求
        if(data.isLogin){
          wx.setStorageSync('cookies', res.cookies)
        }
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}