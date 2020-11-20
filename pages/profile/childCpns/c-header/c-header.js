// pages/profile/childCpns/c-header/c-header.js
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
    userInfo: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo() {
      if (this.data.userInfo.nickName) return
      wx.showModal({
        title: '温馨提示',
        content: '是否确认登录',
        success: res => {
          if (res.confirm) {
            wx.getUserInfo({
              success: res => {
                const userInfo = {
                  nickName: res.userInfo.nickName,
                  avatarUrl: res.userInfo.avatarUrl
                }
                this.setData({
                  userInfo
                })
              }
            })
          }
        }
      })
    },

    logout() {
      wx.showModal({
        title: '温馨提示',
        content: '是否确认退出登录',
        success: res => {
          if (res.confirm) {
            this.setData({
              userInfo: {}
            })
          }
        }
      })
    }
  }
})