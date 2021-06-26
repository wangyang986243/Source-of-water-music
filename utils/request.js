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
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}