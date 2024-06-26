<template>
    <view class="page-wrapper">
        <view class="info-container" v-for="(item, bindex) in dataList" :key="item.k">
            <image :src="item.Picture" class="pic" :data-id="item.goodsId"></image>

            <view class="info-cols">
                <view class="goods-name" :data-id="item.goodsId">{{ item.Name }}</view>
                <view class="price-quantity-row">
                    <view class="price">￥{{ item.Price}}</view>
                    <view class="quantity-row">
                        <view class="decrease" @tap="decreaseQuantity" :data-index="bindex">-</view>
                        <view class="split"></view>
                        <view class="quantity">{{ item.Quantity }}</view>
                        <view class="split"></view>
                        <view class="increase" @tap="increaseQuantity" :data-index="bindex">+</view>
                    </view>
                </view>
            </view>
        </view>

        <view class="bottom-wrapper">
            <view class="bottom-split"></view>
            <view class="bottom-row" v-if="isLoggedIn">
                <view class="selected-row" :data-id="id">
                    <view class="sum-text">总计</view>
                    <view class="price">{{ selectedSum }}</view>
                </view>
                <view class="buy-btn" @tap="gotoConfirmOrder">结算</view>
            </view>
            <view class="bottom-login-row" v-else>
                <view class="login-tips">登录后查看已加购商品</view>
                <view class="login-btn" @tap="gotoLoginPage">立即登录</view>
            </view>
        </view>
    </view>
</template>


<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getDishImage, getGoodInfo, queryCart, addToCart, deleteCart } from '@/common/api'

const id = ref('');
const cartId = ref('');
const dataList = ref([]);
const selectedSum = ref('￥0');
const isLoggedIn = ref(false);

const gotoLoginPage = () => {
    uni.navigateTo({
        url: '/pages/login/login'
    });
};

const queryData = async () => {
    try {
        const response = await queryCart(cartId.value);
        if (response.data.code) {
            dataList.value = response.data.data.cartItems;

            // 逐个获取所有菜品的图片数据，并默认选中所有商品
            let sum = 0;
            for (const dish of dataList.value) {
                try {
                    const imageResponse = await getDishImage(dish.DishID);
                    const nameResponse = await getGoodInfo(dish.DishID);
                    dish.Picture = `data:image/jpeg;base64,${imageResponse.data.data.image}`;
                    dish.Name = nameResponse.data.data.dishInfo.Name;
                    sum += dish.Quantity * dish.Price;
                } catch (imageError) {
                    console.error(`获取图片失败: ${imageError}`);
                    dish.Picture = '';
                }
            }
            selectedSum.value = '￥' + sum;
        }
    } catch (error) {
        console.error('获取购物车数据失败：', error);
    }
};

const increaseQuantity = async (e) => {
    let index = e.currentTarget.dataset['index'];
    let cartItem = dataList.value[index];
    let dishId = cartItem.DishID;
    let quantity = cartItem.Quantity + 1;
    const params = {
        dish_id: parseInt(dishId)
    };
    await addToCart(params);
    cartItem.Quantity = quantity;
    updateSelectionSum();
}

const decreaseQuantity = async (e) => {
    let index = e.currentTarget.dataset['index'];
    let cartItem = dataList.value[index];
    let dishId = cartItem.DishID;
    let cartId = cartItem.CartID;
    const token = uni.getStorageSync('token');
    const params = {
        cart_id: parseInt(cartId),
        dish_id: parseInt(dishId)
    };
    const response = await deleteCart(params);
    if (cartItem.Quantity > 0) {
        cartItem.Quantity -= 1;
        if (cartItem.Quantity === 0) {
            dataList.value.splice(index, 1); // 数量为0时从列表中删除
        }
        updateSelectionSum();
    }
}

const updateSelectionSum = () => {
    var sum = 0;
    dataList.value.forEach((item) => {
        sum += item.Quantity * item.Price;
    });
    selectedSum.value = '￥' + sum;
};

const gotoConfirmOrder = (e) => {
    if (selectedSum.value === '￥0') {
        uni.showToast({
            title: '您未选择任何商品',
            icon: 'none'
        });
        return;
    }
    uni.navigateTo({
        url: `/pages/order/order-confirm/order-confirm?cart_id=${cartId.value}&selectedSum=${selectedSum.value}`
    });
};

onMounted(() => {
    var token = uni.getStorageSync('token');
    console.log(token)
    cartId.value = uni.getStorageSync('cart_id');
    if (token) {
        isLoggedIn.value = true;
        queryData();
    } else {
        isLoggedIn.value = false;
        dataList.value = [];
    }
});
</script>



<style>
page {
    background-color: #f4f4f4;
}

.page-wrapper {
    margin: 0;
    font-size: 28rpx;
    line-height: 1.5;
    color: #333;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: transparent;
}

.info-container {
    background-color: #fff;
    border-radius: 10rpx;
    margin-top: 40rpx;
    margin-left: 20rpx;
    margin-right: 20rpx;
    padding: 20rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.info-cols {
    width: 100%;
    margin-left: 20rpx;
}

.pic {
    width: 350rpx;
    height: 200rpx;
}

.goods-name {
    font-size: 35rpx;
    width: 400rpx;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.price-quantity-row {
    display: flex;
    flex-direction: row;
    margin-top: 20rpx;
}

.quantity-row {
    display: flex;
    flex-direction: row;
    border-radius: 10rem;
    padding-left: 10rpx;
    padding-right: 10rpx;
    border: 1rpx solid #ebebeb;
    align-items: center;
    /* 垂直居中*/
}

.price {
    flex: 1;
    color: #ED9220;
}

.split {
    width: 1rpx;
    height: 100%;
    background-color: #ebebeb;
}

.decrease {
    padding: 5rpx 20rpx;
}

.increase {
    padding: 5rpx 20rpx;
}

.quantity {
    padding-left: 20rpx;
    padding-right: 20rpx;
}

.bottom-wrapper {
    position: sticky;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 100rpx;
    background-color: white;
}

.bottom-split {
    width: 100%;
    height: 1rpx;
    background-color: #ebebeb;
    margin-bottom: 20rpx;
}

.bottom-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 20rpx;
    align-items: center;
}

.selected-row {
    display: flex;
    flex-direction: row;
    flex: 1;
    margin-left: 50rpx;
}

.sum-text {
    margin-left: 20rpx;
}

.price {
    margin-left: 5rpx;
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
	background-color: #ED9220; /* 确保背景颜色为橙色 */
}
.bottom-login-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 20rpx;
    align-items: center;
}
.login-tips{
	flex: 1;
	margin-left: 20rpx;
}
.login-btn {
	background-color: #ED9220;
    color: #fff;
    border-radius: 2rem;
    padding: 10rpx 30rpx;
	margin-right: 20rpx;
}
.btn-enabled {
    background-color: #ED9220;
}

.btn-disabled {
    background-color: #cbccd2;
}
</style>