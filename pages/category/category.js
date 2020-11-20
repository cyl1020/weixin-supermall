// pages/category/category.js
import {
  reqCategorty,
  reqCategortyContent,
  reqCategortyDetail
} from '../../network/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrolltop: 0,
    categoryList: [],
    categoryContent: [],
    title: ["流行", "新款", "精选"],
    goodsname: ['pop', 'new', 'sell'],
    currenttype: 'pop',
    currentIndex: 0,
    categoryDetail: [],
    miniWallkey: 0,
    isShow: false,
    backtopShow: false,
    tabcontrolTop: 0
  },

  async getContent(maitKey, callback) {
    const result = await reqCategortyContent(maitKey)
    this.setData({
      categoryContent: result.data.data.list
    })
    callback && callback()
  },

  async getDetail(miniWallkey, type) {
    const result = await reqCategortyDetail(miniWallkey, type)
    this.setData({
      categoryDetail: result.data
    })
  },

  categoryIndex(e) {
    const index = e.detail
    this.setData({
      currentIndex: index,
      miniWallkey: this.data.categoryList[index].miniWallkey,
      scrolltop: 0
    })
    const maitKey = this.data.categoryList[index].maitKey
    const miniWallkey = this.data.miniWallkey
    this.getContent(maitKey, this.get)
    this.getDetail(miniWallkey, 'pop')
    this.selectComponent('.tab-control').setCurrentIndex(0)
    this.selectComponent('.tab-control-temp').setCurrentIndex(0)
    this.getTop()
  },

  changeIndex(e) {
    const index = e.detail
    const type = this.data.goodsname[index]
    const miniWallkey = this.data.miniWallkey
    this.getDetail(miniWallkey, type)
    this.selectComponent('.tab-control').setCurrentIndex(index)
    this.selectComponent('.tab-control-temp').setCurrentIndex(index)
    this.setData({
      scrolltop: this.data.tabcontrolTop
    })
  },

  scroll(e) {
    wx.createSelectorQuery().select('.tab-control').boundingClientRect(rect => {
      const flag = rect.top > 0
      this.setData({
        isShow: !flag
      })

    }).exec()
    const show = e.detail.scrollTop > this.data.tabcontrolTop
    this.setData({
      backtopShow: show
    })
  },

  backtop() {
    this.setData({
      scrolltop: 0
    })
  },

  getTop() {
    setTimeout(() => {
      wx.createSelectorQuery().select('.tab-control').boundingClientRect(rect => {
        this.setData({
          tabcontrolTop: rect.top
        })
      }).exec()
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const result = await reqCategorty()
    this.setData({
      categoryList: result.data.data.category.list,
      miniWallkey: result.data.data.category.list[0].miniWallkey
    })
    this.getContent(result.data.data.category.list[0].maitKey, this.getTop)
    this.getDetail(result.data.data.category.list[0].miniWallkey, 'pop')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})