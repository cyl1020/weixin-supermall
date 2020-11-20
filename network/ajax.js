//封装wx.request
export default function ajax(url, data = {}, type = "get") {
  wx.showLoading({
    title: '数据加载中ing',
    mask: true
  })
  return new Promise((reslove, reject) => {
    wx.request({
      url: 'http://152.136.185.210:8000/api/w6' + url,
      method: type,
      data: data,
      success: reslove,
      fail: reject,
      complete: () => {
        setTimeout(() => {
          wx.hideLoading()
        }, 1000)
      }
    })
  })
}