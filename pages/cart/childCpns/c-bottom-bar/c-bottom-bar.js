// pages/cart/childCpns/c-bottom-bar/c-bottom-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    allChecked: {
      type: Boolean,
      value: true
    },
    price: {
      type: Number
    },
    counter: {
      type: Number,
      value: 0
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
    allChecked() {
      this.triggerEvent('allChecked')
    },

    payment() {
      this.triggerEvent('payment')
    }
  }
})