// pages/detail/childCpns/c-slide/c-slide.js
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
    list: ['基础', '店铺', '展示', '参数', '推荐'],
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e) {
      let index = e.currentTarget.dataset.index
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('changeTop', index)
    },

    setCurrentIndex(index) {
      this.setData({
        currentIndex: index
      })
    }
  }
})