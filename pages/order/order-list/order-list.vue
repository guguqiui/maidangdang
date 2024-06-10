<template>
    <view class="page-wrapper">
        <view v-for="(order, index) in orders" :key="index" class="order-item">
            <view class="order-info" @tap="gotoOrderDetail(order.OrderID)">
                <view class="order-id">订单ID: {{ order.OrderID }}</view>
                <view class="order-amount">总金额: ￥{{ order.TotalAmount }}</view>
                <view class="order-status">状态: {{ order.Status }}</view>
                <view class="order-type">类型: {{ order.Type }}</view>
                <view class="order-created">创建时间: {{ formatDate(order.CreatedAt) }}</view>
            </view>
            <view class="order-actions">
                <button class="order-button" @tap.stop="deleteOrder(order.OrderID)">删除订单</button>
                <button class="order-button" @tap.stop="requestRefund(order.OrderID)">申请退款</button>
                <button class="order-button" @tap.stop="gotoComment(order.OrderID)">评价服务</button>
            </view>
        </view>
    </view>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { listOrder, removeOrder, refundOrder } from '@/common/api';

const orders = ref([]); // 响应式变量，用于存储订单数据

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const showOrder = async () => {
    try {
        const response = await listOrder();
		console.log(response)
        if (response.data.code === 0) {
            orders.value = response.data.data.orders;
        } else {
            console.error('Failed to fetch orders: Invalid response code');
        }
    } catch (error) {
        console.error('Failed to fetch orders:', error);
    }
};

const gotoOrderDetail = (orderId) => {
    uni.navigateTo({
        url: `/pages/order/order-detail/order-detail?order_id=${orderId}`
    });
};

const deleteOrder = async (orderId) => {
	const params = {
	    order_id: orderId
	};
    try {
        const response = await removeOrder(params)
        if (response.data.code === 0) {
            uni.showToast({
                title: '订单删除成功',
                icon: 'success',
                duration: 2000
            });
            showOrder(); // 重新加载订单列表
        } else {
            console.error('Failed to delete order: Invalid response code');
        }
    } catch (error) {
        console.error('Failed to delete order:', error);
    }
};

const requestRefund = async (orderId) => {
    try {
        const response = await refundOrder(orderId);
        if (response.data.code === 1) {
            uni.showToast({
                title: '退款申请成功',
                icon: 'success',
                duration: 2000
            });
            showOrder(); // 重新加载订单列表
        } else {
            console.error('Failed to request refund: Invalid response code');
        }
    } catch (error) {
        console.error('Failed to request refund:', error);
    }
};

const gotoComment = (orderId) => {
    uni.navigateTo({
        url: `/pages/comment/comment?order_id=${orderId}`
    });
};

onMounted(() => {
    showOrder();
});
</script>



<style>
.page-wrapper {
    padding: 20rpx;
    background-color: #f4f4f4;
}

.order-item {
    margin-bottom: 20rpx;
    padding: 20rpx;
    border: 1rpx solid #ebebeb;
    border-radius: 10rpx;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.order-info {
    width: 100%;
    margin-bottom: 10rpx;
}

.order-id, .order-amount, .order-status, .order-type, .order-created {
    margin-bottom: 10rpx;
    font-size: 28rpx;
    color: #333;
}

.order-actions {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.order-button {
    flex: 1;
    font-size: 30rpx;
    padding: 5rpx 0;
    margin: 0 10rpx;
    border-radius: 20rpx;
    background-color: #ed9220;
    color: #fff;
    text-align: center;
}
</style>





