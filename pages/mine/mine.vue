<template>
    <view class="page-wrapper">
        <view class="settings-row">
            <image class="settings-img" src="/static/images/settings.png" @tap="gotoSettings"></image>
        </view>
        <view class="user-row">
            <image class="user-img" src="/static/images/user.png"></image>
            <view class="user-info" @tap="onClickUserDesc">
                <view>{{ userDesc }}</view>
            </view>
        </view>
        <view class="order-container">
            <view class="order-row" @tap="gotoOrderPage" data-status="0">
                <view class="my-orders">我的订单</view>
                <view class="all-order-with-arrow">
                    <view>全部订单</view>
                    <image class="right_arrow" src="/static/images/right_arrow.png"></image>
                </view>
            </view>
        </view>
        <view class="wallet-container">
            <view class="wallet-row" @tap="gotoWalletPage">
                <view class="my-wallet">我的钱包</view>
                <view class="wallet-arrow-with-text">
                    <view>查看钱包</view>
                    <image class="right_arrow" src="/static/images/right_arrow.png"></image>
                </view>
            </view>
        </view>
    </view>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { onShow } from "@dcloudio/uni-app";

const userDesc = ref('');

const checkUserStatus = () => {
    var token = uni.getStorageSync('token');
    if (token) {
        userDesc.value = '尊贵会员';
    } else {
        userDesc.value = '登录/注册 >';
    }
};

const onClickUserDesc = () => {
    const token = uni.getStorageSync('token');
    if (!token) {
        uni.navigateTo({
            url: '/pages/login/login'
        });
    }
};

const gotoSettings = () => {
    const token = uni.getStorageSync('token');
    if (!token) {
        uni.navigateTo({
            url: '/pages/login/login'
        });
    } else {
        uni.navigateTo({
            url: '/pages/settings/settings'
        });
    }
};

const gotoOrderPage = (status) => {
    uni.navigateTo({
        url: '/pages/order/order-list/order-list?status=' + status
    });
};

const gotoWalletPage = () => {
    uni.navigateTo({
        url: '/pages/wallet/wallet'
    });
};

onMounted(() => {
    checkUserStatus();
});
</script>

<style>
.page-wrapper {
    margin: 0;
    line-height: 1.5;
    color: #333;
    background-color: #f4f4f4;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: transparent;
    min-height: 2000rpx;
    font-size: 30rpx;
}

.settings-row {
    text-align: right;
    padding-top: 20rpx;
    padding-right: 40rpx;
}

.settings-img {
    height: 50rpx;
    width: 50rpx;
}

.user-img {
    height: 100rpx;
    width: 100rpx;
}

.user-row {
    padding-left: 20rpx;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    margin-left: 20rpx;
    margin-right: 20rpx;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    border-radius: 10rpx;
}

.user-info {
    padding-left: 50rpx;
}

.order-container{
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
.wallet-container {
	background-color: #fff;
	border-radius: 10rpx;
	margin-top: 10rpx;
	margin-left: 20rpx;
	margin-right: 20rpx;
	padding-left: 20rpx;
	padding-right: 20rpx;
	padding-top: 20rpx;
	padding-bottom: 20rpx;
}

.order-row, .wallet-row {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
}

.my-orders, .my-wallet {
    flex: 1;
}

.right_arrow {
    height: 40rpx;
    width: 40rpx;
}

.all-order-with-arrow, .wallet-arrow-with-text {
    display: flex;
    flex-direction: row;
}

.order-img {
    height: 80rpx;
    width: 80rpx;
}

.order-cells {
    margin-top: 40rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.order-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
