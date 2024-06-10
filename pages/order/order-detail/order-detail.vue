<template>
    <view class="page-wrapper">
        <view v-if="orderItems.length > 0" class="order-container">
            <view v-for="(item, index) in orderItems" :key="index" class="order-item">
                <image :src="item.Picture" class="dish-image"></image>
                <view class="item-info">
                    <view class="dish-name">菜品名称: {{ item.Name }}</view>
                    <view class="dish-details">数量: {{ item.Quantity }}</view>
                    <view class="dish-details">单价: ￥{{ item.Price }}</view>
                    <view class="dish-details">总价: ￥{{ (item.Quantity * item.Price).toFixed(2) }}</view>
                </view>
            </view>
        </view>
        <view v-else class="no-order">暂无订单详情</view>
    </view>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { searchOrder, getGoodInfo, getDishImage} from '@/common/api';

const id = ref('');
const orderItems = ref([]); // 用于存储订单项的响应式变量

onLoad((e) => {
    id.value = e.order_id;
    queryData();
});

const queryData = async () => {
    const params = {
        order_id: parseInt(id.value)
    };
    try {
        const response = await searchOrder(params);
        // console.log(response);
        if (response.data.code === 0) {
            const orders = response.data.data.orders
			
			// 逐个获取所有菜品的图片数据
			for (const dish of orders) {
				try {
					const imageResponse = await getDishImage(dish.DishID)
					const nameResponse = await getGoodInfo(dish.DishID)
					dish.Picture = `data:image/jpeg;base64,${imageResponse.data.data.image}`
					dish.Name = nameResponse.data.data.dishInfo.Name
					dish.Price = nameResponse.data.data.dishInfo.Price
				} catch (imageError) {
					console.error(`获取图片失败: ${imageError}`);
					dish.Picture = '';
				}
			}
			orderItems.value = orders;
        } else {
            console.error("获取订单详情失败:", response.data.message);
        }
    } catch (error) {
        console.error("获取订单详情失败:", error);
    }
};

</script>

<style>
.page-wrapper {
    padding: 20rpx;
    background-color: #f4f4f4;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.order-container {
    width: 100%;
    background-color: #fff;
    border-radius: 10rpx;
    box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
    padding: 20rpx;
}

.order-item {
    display: flex;
    flex-direction: row;
    margin-bottom: 20rpx;
    padding: 20rpx;
    border: 1rpx solid #ebebeb;
    border-radius: 10rpx;
    background-color: #fff;
}

.dish-image {
    width: 200rpx;
    height: 200rpx;
    border-radius: 10rpx;
    margin-right: 20rpx;
}

.item-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.dish-name {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 10rpx;
}

.dish-details {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 5rpx;
}

.no-order {
    margin-top: 50rpx;
    font-size: 32rpx;
    color: #999;
}
</style>


