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
import { getGoodInfo } from '@/common/api';
import { onLoad } from '@dcloudio/uni-app';

	const id = ref('');
	const costSum = ref(0);
	
	onLoad((e) => {
		id.value = String(e.id);
		queryData();
	});
	
	const queryData = async () => {
	  try {
	    const response = await getGoodInfo(id.value);
	    if (!response.data.code) {
	      costSum.value = '￥' + response.data.data.dishInfo.Price;
	    }
	  } catch (error) {
	    console.error('获取商品数据失败：', error);
	  }
	};
	
	const createOrder = () => {

	};
	
	// gotoOrderDetail(orderId) {
	//     uni.navigateTo({
	//         url: '/pages/order/order-detail/order-detail?id=' + orderId
	//     });
	// }
	
	
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


.goods-info {
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
    flex-direction: row;
    align-items: center;
}

.goods-img-wrapper {
    flex: 1;
}

.goods-img {
    width: 200rpx;
    height: 200rpx;
}

.delivery-info {
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
    flex-direction: row;
    align-items: center;
}

.delivery_text {
    margin-left: 20rpx;
    color: #595d65;
}

.package-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 40rpx;
}

.package-sender {
    color: #333333;
}

.package-time {
    color: #717171;
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
}

.btn-enabled {
    background-color: #ED9220;
}

.btn-disabled {
    background-color: #cbccd2;
}
</style>
