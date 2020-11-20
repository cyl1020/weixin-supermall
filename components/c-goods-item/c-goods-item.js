// components/c-goods-item/c-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsitem: {
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
    itemClick() {
      const iid = this.data.goodsitem.iid || this.data.goodsitem.item_id
      wx.navigateTo({
        url: '../../pages/detail/detail?iid=' + iid,
      })
    }
  }
})