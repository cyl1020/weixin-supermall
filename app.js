App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  },

  addCart(good) {
    const oldGood = this.globaData.cartList.find(item => item.iid === good.iid)
    if (oldGood) {
      oldGood.count += 1
      wx.showModal({
        title: '温馨提示',
        content: '商品数量加1',
        cancelText: '再看看',
        confirmText: '去购物车',
        confirmColor: '#ff5777',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../cart/cart',
            })
          }
        }
      })
    } else {
      this.globaData.cartList.push(good)
      wx.showModal({
        title: '温馨提示',
        content: '加入购物车成功',
        cancelText: '再看看',
        confirmText: '去购物车',
        confirmColor: '#ff5777',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../cart/cart',
            })
          }
        }
      })
    }
  },

  update(good, flag) {
    return new Promise((reslove, rejrct) => {
      if (good.length) {
        good.map(item => item.checked = flag)
        reslove()
      } else {
        const oldGood = this.globaData.cartList.find(item => item.iid === good.iid)
        oldGood.checked = !oldGood.checked
        reslove()
      }
    })

  },

  globaData: {
    cartList: []
  }
})