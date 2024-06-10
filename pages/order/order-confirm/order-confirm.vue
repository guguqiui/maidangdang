<template>
    <view class="page-wrapper">
        <view class="cost-info-rows">
            <view class="cost-info-row">
                <view class="cost-info-left">商品金额</view>
                <view class="cost-info-right">{{ costSum }}</view>
            </view>
            <view class="cost-info-row">
                <view class="cost-info-left">优惠券</view>
                <view class="cost-info-right">无可用券</view>
            </view>
            <view class="cost-info-row">
                <view class="cost-info-left">就餐方式</view>
                <view class="cost-info-right">
                    <radio-group @change="handleDiningOptionChange" class="dining-option-group">
                        <label class="radio-label">
                            <radio value="堂食" :checked="diningOption === '堂食'">堂食</radio>
                        </label>
                        <label class="radio-label">
                            <radio value="外带" :checked="diningOption === '外带'">外带</radio>
                        </label>
                    </radio-group>
                </view>
            </view>
            <view class="cost-info-row">
                <view class="cost-info-left">支付方式</view>
                <view class="cost-info-right">
                    <radio-group @change="handlePaymentMethodChange" class="payment-method-group">
                        <label class="radio-label">
                            <radio value="微信支付" :checked="paymentMethod === '微信支付'">微信支付</radio>
                        </label>
                        <label class="radio-label">
                            <radio value="余额支付" :checked="paymentMethod === '余额支付'">余额支付</radio>
                        </label>
                    </radio-group>
                </view>
            </view>
            <view class="cost-info-row">
                <view class="cost-info-left">备注</view>
                <view class="remark-container">
                    <input class="remark-input" placeholder="添加备注" @input="handleRemarkInput" />
                </view>
            </view>
        </view>

        <view class="bottom-wrapper">
            <view class="bottom-split"></view>
            <view class="bottom-btns">
                <view class="cost-row" :data-id="id">
                    <view class="cost-text">实付款</view>
                    <view class="cost">{{ costSum }}</view>
                </view>
                <view :class="'buy-btn ' + 'btn-enabled'" @tap="createOrder">提交订单</view>
            </view>
        </view>
    </view>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { getGoodInfo, submitOrder } from '@/common/api';
import { onLoad } from '@dcloudio/uni-app';

const id = ref('');
const costSum = ref(0);
const selectedCartItems = ref([]); // 存储选中的商品信息
const diningOption = ref('外带'); // 用于存储用户选择的就餐方式
const paymentMethod = ref('微信支付'); // 用于存储用户选择的支付方式
const remark = ref(''); // 用于存储用户输入的备注

onLoad((e) => {
    id.value = String(e.cart_id);
    costSum.value = String(e.selectedSum);
    queryData();
});

const queryData = async () => {
    // 在此处添加获取订单详情的代码
};

const handleDiningOptionChange = (e) => {
    diningOption.value = e.detail.value;
    console.log('Selected dining option:', diningOption.value);
};

const handlePaymentMethodChange = (e) => {
    paymentMethod.value = e.detail.value;
    console.log('Selected payment method:', paymentMethod.value);
};

const handleRemarkInput = (e) => {
    remark.value = e.detail.value;
};

const createOrder = async () => {
    const token = uni.getStorageSync('token');
    // console.log(token);
    const params = {
        cart_id: parseInt(id.value),
        order_type: diningOption.value,
        pay_method: paymentMethod.value, // 将支付方式添加到参数中
        remark: remark.value // 将备注添加到参数中
    };
    try {
        const response = await submitOrder(params);
        console.log(response);

        if (response.data.code === 0) {
            uni.showToast({
                title: '提交订单成功',
                icon: 'success',
                duration: 2000
            });
        } else {
            uni.showToast({
                title: '提交订单失败',
                icon: 'none',
                duration: 2000
            });
        }
    } catch (error) {
        console.error('Failed to submit order:', error);
        uni.showToast({
            title: '提交订单失败',
            icon: 'none',
            duration: 2000
        });
    }
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

.cost-info-rows {
    background-color: #fff;
    border-radius: 10rpx;
    margin-top: 40rpx;
    margin-left: 20rpx;
    margin-right: 20rpx;
    padding-left: 20rpx;
    padding-right: 20rpx;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    display: flex;
    flex-direction: column;
}

.cost-info-row {
    display: flex;
    flex-direction: row;
    margin-top: 20rpx;
}

.cost-info-left {
    color: #595d65;
    flex: 1;
}

.cost-info-right {
    color: #222222;
    display: flex;
    align-items: center;
}

.dining-option-group,
.payment-method-group {
    display: flex;
    flex-direction: row;
}

.radio-label {
    margin-right: 20rpx;
    display: flex;
    align-items: center;
}

.radio {
    margin-right: 10rpx;
}

.remark-container {
    flex: 1;
    margin-left: 10rpx;
}

.remark-input {
    width: 95%;
    font-size: 28rpx;
    padding: 10rpx;
    border: 1rpx solid #ebebeb;
    border-radius: 5rpx;
    margin-top: 10rpx;
}

.bottom-wrapper {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 10rpx;
    background-color: white;
}

.bottom-split {
    width: 100%;
    height: 1rpx;
    background-color: #ebebeb;
    margin-bottom: 20rpx;
}

.bottom-btns {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 20rpx;
    align-items: center;
}

.cost-row {
    display: flex;
    flex-direction: row;
    flex: 1;
    margin-left: 50rpx;
    font-size: 40rpx;
    align-items: center;
}

.cost-text {
    font-size: 30rpx;
}

.sum-text {
    margin-left: 40rpx;
}

.cost {
    margin-left: 20rpx;
    color: #ED9220;
}

.buy-btn {
    flex: 1;
    font-size: 35rpx;
    color: #fff;
    border-radius: 2rem;
    padding: 10rpx;
    display: flex;
    justify-content: center;
    margin-right: 50rpx;
    background-color: #ED9220;
}

.btn-enabled {
    background-color: #ED9220;
}

.btn-disabled {
    background-color: #cbccd2;
}
</style>

