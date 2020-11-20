// pages/detail/childCpns/c-bottom-bar/c-bottom-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    addCart() {
      this.triggerEvent('addCart')
    },

    buy() {
      wx.showModal({
        title: '温馨提示',
        content: '功能暂未实现，敬请期待',
        showCancel: false
      })
    }
  }
})