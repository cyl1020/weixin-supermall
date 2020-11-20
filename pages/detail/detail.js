// pages/detail/detail.js
import {
  reqDetail,
  reqRecommend
} from '../../network/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topImages: [],
    topImagesShow: false,
    baseInfo: {},
    baseInfoShow: false,
    shopInfo: {},
    shopInfoShow: false,
    detailInfo: {},
    detailInfoShow: false,
    paramsInfo: {},
    paramsInfoShow: false,
    recommend: [],
    recommendShow: false,
    top: [],
    scrolltop: 0,
    show: false,
    topY: 0,
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const {
      iid
    } = options || ' '
    this.setData({
      iid: iid
    })
    const result = await reqDetail(iid)
    // console.log(result);
    if (result.statusCode === 500) return false
    
    const {
      itemInfo
    } = result.data.result || ' '
    const {
      discountDesc,
      price,
      lowNowPrice,
      oldPrice,
      title
    } = itemInfo || ' '
    const {
      columns
    } = result.data.result || ' '
    const {
      services
    } = result.data.result.shopInfo || ' '
    const {
      cFans,
      cGoods,
      cSells,
      score,
      name,
      shopLogo
    } = result.data.result.shopInfo || ' '
    const {
      desc,
      detailImage
    } = result.data.result.detailInfo || ' '
    const {
      info,
      rule
    } = result.data.result.itemParams || ' '

    this.setData({
      topImages: itemInfo.topImages,
      baseInfo: {
        discountDesc,
        price,
        lowNowPrice,
        oldPrice,
        title,
        columns,
        services
      },
      shopInfo: {
        cFans: (cFans / 10000).toFixed(2),
        cGoods,
        cSells: (cSells / 10000).toFixed(2),
        score,
        name,
        shopLogo
      },
      detailInfo: {
        desc,
        detailImage
      },
      paramsInfo: {
        info,
        rule
      }
    })
    this.getRecommend()
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
    setTimeout(() => {
      if (this.data.topImages.length !== 0) {
        this.setData({
          topImagesShow: true
        })
      }
      if (Object.keys(this.data.baseInfo).length !== 0) {
        this.setData({
          baseInfoShow: true
        })
      }
      if (Object.keys(this.data.shopInfo).length !== 0) {
        this.setData({
          shopInfoShow: true
        })
      }
      if (Object.keys(this.data.detailInfo).length !== 0) {
        this.setData({
          detailInfoShow: true
        })
      }
      if (Object.keys(this.data.paramsInfo).length !== 0) {
        this.setData({
          paramsInfoShow: true
        })
      }
      if (this.data.recommend.length !== 0) {
        this.setData({
          recommendShow: true
        })
      }
      const {
        topImagesShow,
        baseInfoShow,
        shopInfoShow,
        detailInfoShow,
        paramsInfoShow,
      } = this.data
      if (!topImagesShow && !baseInfoShow && !shopInfoShow && !detailInfoShow && !paramsInfoShow) {
        wx.showModal({
          title: '温馨提示',
          content: '该商品暂时没有详情，敬请期待！！！',
          showCancel: false,
          complete: () => {
            wx.navigateBack({
              delta: 0,
            })
          }
        })
      } else {
        this.setData({
          show: true
        })
      }
      this.data.show && this.getTop()
    }, 1000)
  },

  async getRecommend() {
    const result = await reqRecommend()
    // console.log(result);
    this.setData({
      recommend: result.data.data.list
    })

  },

  getTop() {
    wx.createSelectorQuery().select('.swiper').boundingClientRect(rect => {
      const top1 = rect && rect.top
      this.setData({
        top: [top1]
      })
    }).exec()
    wx.createSelectorQuery().select('.shopinfo').boundingClientRect(rect => {
      const top2 = rect && rect.top
      this.setData({
        top: [...this.data.top, top2]
      })
    }).exec()
    wx.createSelectorQuery().select('.goodsinfo').boundingClientRect(rect => {
      const top3 = rect && rect.top
      this.setData({
        top: [...this.data.top, top3]
      })
    }).exec()
    wx.createSelectorQuery().select('.paramsinfo').boundingClientRect(rect => {
      const top4 = rect && rect.top
      this.setData({
        top: [...this.data.top, top4]
      })
    }).exec()
    wx.createSelectorQuery().select('.recommend').boundingClientRect(rect => {
      const top5 = rect && rect.top
      this.setData({
        top: [...this.data.top, Math.floor(top5)]
      })
    }).exec()
  },

  changeTop(e) {
    let index = e.detail
    let top = this.data.top[index]
    this.setData({
      scrolltop: top
    })
  },

  scroll(e) {
    const currentTop = e.detail.scrollTop
    const top = this.data.top
    for (let i = 0; i < top.length; i++) {
      if (this.data.topY !== i && ((i !== top.length - 1 && currentTop >= top[i] && currentTop < top[i + 1]) || (i === top.length - 1 && currentTop > top[i]))) {
        this.setData({
          topY: i
        })
        this.selectComponent('.slide').setCurrentIndex(i)
      }
    }
    const flag = currentTop > 600
    this.setData({
      isShow: flag
    })
  },

  backtop() {
    this.setData({
      scrolltop: 0
    })
  },

  addCart() {
    const app = getApp()
    const good = {
      image: this.data.topImages[0],
      price: this.data.baseInfo.lowNowPrice,
      title: this.data.baseInfo.title,
      desc: this.data.detailInfo.desc,
      iid: this.data.iid,
      count: 1,
      checked: true
    }
    app.addCart(good)
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