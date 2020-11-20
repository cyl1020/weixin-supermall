// pages/home/home.js
import {
  reqHomeTop,
  reqHomeData
} from '../../network/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    recommend: [],
    title: ["流行", "新款", "精选"],
    goodsname: ['pop', 'new', 'sell'],
    currentType: 'pop',
    scrollTop: 0,
    isShow: false,
    backtopShow: false,
    tabcontrolTop: 0,
    goods: {
      pop: {
        page: 1,
        list: []
      },
      new: {
        page: 1,
        list: []
      },
      sell: {
        page: 1,
        list: []
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHome(this.getTop)
    this.getHomeData('pop')
    this.getHomeData('new')
    this.getHomeData('sell')
  },

  async getHome(callback) {
    const result = await reqHomeTop()
    const {
      banner,
      recommend
    } = result.data.data
    this.setData({
      banner,
      recommend
    })
    callback && callback()
  },

  async getHomeData(type) {
    let page = this.data.goods[type].page
    const result = await reqHomeData(type, page)

    const list = result.data.data.list;
    const goods = this.data.goods;
    goods[type].list.push(...list)
    goods[type].page += 1;

    this.setData({
      goods: goods
    })
  },

  changeIndex(e) {
    let type = this.data.goodsname[e.detail]
    this.setData({
      currentType: type,
      scrollTop: this.data.tabcontrolTop
    })
    this.selectComponent('.tab-control').setCurrentIndex(e.detail)
    this.selectComponent('.tab-control-temp').setCurrentIndex(e.detail)
  },

  pulling() {
    let type = this.data.currentType
    this.getHomeData(type)
  },

  scroll(e) {
    wx.createSelectorQuery().select('.tab-control-temp').boundingClientRect(rect => {
      const flag = rect && rect.top > 0
      this.setData({
        isShow: !flag
      })

    }).exec()
    const show = e.detail.scrollTop > 600
    this.setData({
      backtopShow: show
    })

  },

  backtop() {
    this.setData({
      scrollTop: 0
    })
  },

  getTop() {
    setTimeout(() => {
      wx.createSelectorQuery().select('.tab-control-temp').boundingClientRect(rect => {
        this.setData({
          tabcontrolTop: rect.top
        })
      }).exec()
    }, 1000)
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