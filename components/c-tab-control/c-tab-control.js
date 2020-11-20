// components/c-tab-control/c-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentindex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e) {
      let index = e.currentTarget.dataset.index
      this.setData({
        currentindex: index
      })
      this.triggerEvent('changeIndex', index)
      
    },

    setCurrentIndex(index) { 
      this.setData({
        currentindex: index
      })
    }
  }
})
