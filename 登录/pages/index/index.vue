<template>
  <view class="login-view">
    <view v-if="isAuthorize">
      <text>{{ userInfo.nickName }}</text>
    </view>
    <button class="authorize-btn btn" @click="getUserProfile" v-else>
      授权微信登录
    </button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isAuthorize: false,
      userInfo: {},
    };
  },
  onLoad() {
    this.userInfo = uni.getStorageSync('userInfo') || {};
    if (Object.keys(this.userInfo).length) {
      this.isAuthorize = true;
    }
  },
  methods: {
    getUserProfile(e) {
      // 获取用户信息。页面产生点击事件（例如 button 上 bindtap 的回调中）后才可调用，每次请求都会弹出授权窗口，用户同意后返回 userInfo。
      uni.getUserProfile({
        desc: '用于完善个人资料',
        success: ({ userInfo }) => {
          uni.setStorageSync('userInfo', userInfo);
          this.fetchLogin();
        },
      });
    },
    fetchLogin() {
      uni.showLoading({
        title: '加载中',
        mask: true,
      });
      wx.login({
        success: ({ code }) => {
          this.$apis.user
            .getOpenidByCode({ code })
            .then((data) => {
              const userInfo = uni.getStorageSync('userInfo');
              uni.setStorageSync('userInfo', {
                ...userInfo,
                openid: data.openid,
                sessionKey: data.session_key,
              });
              this.step = 2;
            })
            .finally(() => {
              uni.hideLoading();
            });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-view {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .btn {
    width: 498rpx;
    height: 80rpx;
    border-radius: 8rpx;
    font-size: 32rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .authorize-btn {
    color: #fff;
    background: #0088ff;
  }
}
</style>
