// pages/category/childCpns/c-category/c-category.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categoryList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e) {
      const index = e.currentTarget.dataset.index
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('categoryIndex', index)
    }
  }
})