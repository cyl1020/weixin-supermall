// pages/cart/cart.js
const app = getApp()

Page({
  data: {
    cartList: [],
    count: 0,
    checkedCount: 0,
    price: 0,
    counter: 0,
    allChecked: false
  },
  onLoad() {
    // this.setData({
    //   cartList: app.globaData.cartList
    // })
    // wx.setNavigationBarTitle({
    //   title: `购物车 + this.data.index`,
    // })
  },
  onShow() {
    this.changeData()
  },

  changeData() {
    let cartList = app.globaData.cartList

    this.setData({
      cartList
    })

    let count = cartList.length
    let checkedCount = cartList.reduce((pre, item) => {
      return item.checked ? pre + item.count : pre
      // if (item.checked) {
      //   return pre + item.count
      // } else {
      //   return pre
      // }
    }, 0)
    let price = cartList.reduce((pre, item) => {
      return item.checked ? pre + item.price * item.count : pre
      // if (item.checked) {
      //   return pre + item.price * item.count
      // } else {
      //   return pre
      // }
    }, 0)
    let counter = cartList.reduce((pre, item) => {
      return item.checked ? pre + item.count : pre
      // if (item.checked) {
      //   return pre + item.count
      // } else {
      //   return pre
      // }
    }, 0)

    let allChecked = cartList.every(item => item.checked)

    this.setData({
      count,
      checkedCount,
      price: this.fixed(price),
      counter,
      allChecked
    })

    wx.setNavigationBarTitle({
      title: '购物车' + '(' + this.data.count + ')',
    })
  },

  changeChecked(e) {
    let item = e.currentTarget.dataset.item
    app.update(item).then(() => {
      this.changeData()
    })
  },

  allChecked() {
    if (this.data.cartList.length === 0) return
    this.data.allChecked = !this.data.allChecked
    app.update(this.data.cartList, this.data.allChecked).then(() => {
      this.changeData()
    })
  },

  payment() {
    if (this.data.checkedCount) {
      wx.showModal({
        title: '温馨提示',
        content: '该功能暂未开放，敬请期待',
        showCancel: false
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '没有要结算的商品',
        showCancel: false
      })
    }
  },

  fixed(value) {
    return value.toFixed(2)
  },

  tohome() {
    wx.switchTab({
      url: '../home/home',
    })
  }
})