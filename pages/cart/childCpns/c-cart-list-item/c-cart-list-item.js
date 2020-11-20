// pages/cart/childCpns/c-cart-list-item/c-cart-list-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object,
      value: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeChecked() {
      this.triggerEvent('changeChecked')
    },

    toDetail(e) { 
      const iid = e.currentTarget.dataset.iid
      wx.navigateTo({
        url: '../detail/detail?iid=' + iid,
      })
    }
  }
})