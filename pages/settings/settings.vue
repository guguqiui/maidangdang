//厦门大学计算机专业 | 前华为工程师
//专注《零基础学编程系列》  http://lblbc.cn/blog
//包含：Java | 安卓 | 前端 | Flutter | iOS | 小程序 | 鸿蒙
//公众号：蓝不蓝编程
<template>
    <view class="page-wrapper">
        <view class="user-info-container">
            <view class="user-info-row">
                <image class="user-img" src="/static/images/user.png"></image>
                <view class="user-info">
                    <view class="user-name">用户</view>
                </view>
                <view class="view_details">
                    <view>查看个人资料</view>
                    <image class="right_arrow" src="/static/images/right_arrow.png"></image>
                </view>
            </view>
            <view class="split"></view>
            <view class="common-info-row">
                <view class="common-info">隐私设置</view>
                <image class="right_arrow" src="/static/images/right_arrow.png"></image>
            </view>
            <view class="split"></view>
            <view class="common-info-row">
                <view class="common-info">APP版本</view>
                <image class="right_arrow" src="/static/images/right_arrow.png"></image>
            </view>
            <view class="split"></view>
            <view class="common-info-row">
                <view class="common-info">隐私政策</view>
                <image class="right_arrow" src="/static/images/right_arrow.png"></image>
            </view>
            <view class="split"></view>
            <view class="common-info-row">
                <view class="common-info">关于</view>
                <image class="right_arrow" src="/static/images/right_arrow.png"></image>
            </view>
        </view>
		<view class="bottom-wrapper">
			<button class="quit-login-btn"  @tap="doLogout">退出登录</button>
		</view>
	</view>
</template>

<script setup>

const doLogout = () => {
    uni.removeStorageSync('token');
    uni.switchTab({
        url: '/pages/index/index'
    });
};
</script>
<style>
.page-wrapper {
    margin: 0;
    font-size: 28rpx;
    line-height: 1.5;
    color: #333;
    background-color: #f4f4f4;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: transparent;
    min-height: 2000rpx;
}

.user-img {
    height: 100rpx;
    width: 100rpx;
}

.user-row {
    padding-left: 20rpx;
    display: flex;
    flex-direction: row;
}

.user-info {
    padding-left: 50rpx;
    flex: 1;
}

.user-name {
    font-size: 40rpx;
}


.user-info-container {
    background-color: #fff;
    border-radius: 10rpx;
    margin-top: 40rpx;
    margin-left: 20rpx;
    margin-right: 20rpx;
    padding-left: 20rpx;
    padding-right: 20rpx;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
}

.user-info-row {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    margin-bottom: 20rpx;
}

.right_arrow {
    height: 40rpx;
    width: 40rpx;
}

.view_details {
    display: flex;
    flex-direction: row;
}
.split {
    background-color: #eaeaea;
    height: 1rpx;
    width: 100%;
}
.addr-row {
    display: flex;
    flex-direction: row;
    margin-top: 20rpx;
}
.addr {
    flex: 1;
}
.common-info-row {
    display: flex;
    flex-direction: row;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
}
.common-info {
    flex: 1;
}
.bottom-wrapper {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 30rpx;
}
.quit-login-btn{
	background-color: #ED9220;
	color: white;
	border-radius: 2rem;
	margin-left: 20rpx;
	margin-right: 20rpx;
}
</style>
