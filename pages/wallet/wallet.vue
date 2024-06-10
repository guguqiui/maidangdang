<template>
    <view class="page-wrapper">
        <view class="wallet-balance-row">
            <view class="wallet-balance-label">钱包余额</view>
            <view class="wallet-balance-value">￥{{ walletBalance }}</view>
        </view>
        <view class="recharge-container">
            <input class="recharge-input" type="number" placeholder="输入充值金额" v-model="rechargeAmount" />
            <button class="recharge-btn" @tap="rechargeWallet">充值</button>
        </view>
    </view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { recharge, getUserInfo } from '@/common/api';

const walletBalance = ref('0.00');
const rechargeAmount = ref('');

const showWalletBalance = async () => {
    try {
        const response = await getUserInfo();
		console.log(response.data.data)
        if (response.data.code === 0) {
            walletBalance.value = response.data.data.user.Balance;
        } else {
            console.error('Failed to fetch wallet balance');
        }
    } catch (error) {
        console.error('Error fetching wallet balance:', error);
    }
};

const rechargeWallet = async () => {
    if (!rechargeAmount.value) {
        uni.showToast({
            title: '请输入充值金额',
            icon: 'none',
            duration: 2000
        });
        return;
    }
	
	const params ={
		amount: parseInt(rechargeAmount.value)
	}

    try {
        const response = await recharge(params);
        if (response.data.code === 0) {
            uni.showToast({
                title: '充值成功',
                icon: 'success',
                duration: 2000
            });
            showWalletBalance(); // 充值成功后刷新余额
            rechargeAmount.value = ''; // 清空输入框
        } else {
            uni.showToast({
                title: '充值失败',
                icon: 'none',
                duration: 2000
            });
        }
    } catch (error) {
        console.error('Error during recharge:', error);
        uni.showToast({
            title: '充值失败',
            icon: 'none',
            duration: 2000
        });
    }
};

onMounted(() => {
    showWalletBalance();
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
    min-height: 100vh;
    font-size: 30rpx;
    padding: 20rpx;
}

.wallet-balance-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20rpx;
    background-color: #fff;
    border-radius: 10rpx;
    margin-top: 20rpx;
    box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.wallet-balance-label {
    font-size: 30rpx;
    color: #333;
}

.wallet-balance-value {
    font-size: 32rpx;
    color: #ED9220;
}

.recharge-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40rpx;
    padding: 20rpx;
    background-color: #fff;
    border-radius: 10rpx;
    box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.recharge-input {
    width: 90%;
    padding: 15rpx;
    border: 1rpx solid #ebebeb;
    border-radius: 5rpx;
    margin-bottom: 20rpx;
    font-size: 28rpx;
}

.recharge-btn {
    width: 90%;
    padding: 15rpx;
    background-color: #ED9220;
    color: #fff;
    border: none;
    border-radius: 20rpx;
    font-size: 28rpx;
    text-align: center;
}
</style>

