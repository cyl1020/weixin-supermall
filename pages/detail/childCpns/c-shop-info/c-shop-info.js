// pages/detail/childCpns/c-shop-info/c-shop-info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shopInfo: {
      type: Object,
      value: {}
    }
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
    handleClick() {
      wx.showModal({
        title: '温馨提示',
        content: '店铺暂未开放，敬请期待',
        showCancel: false
      })
    }
  }
})
