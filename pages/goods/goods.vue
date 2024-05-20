<template>
	<view class="page-wrapper">
		<view class="img-container">
			<image class="goods-img" :src="picUrl"></image>
		</view>
		
		<view class="goods-info">
			<view class="goods-price">{{ price }}</view>
			<view class="goods-name">{{ name }}</view>
			<view class="goods-description">{{ description }}</view>
		</view>

		<view class="bottom-wrapper">
			<view class="bottom-split"></view>
			<view class="bottom-btns">
				<view class="cart-btn" @tap="addGoodToCart" :data-id="id">加入购物车</view>
				<view class="buy-btn" @tap="buyNow" :data-id="id">立刻购买</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getGoodInfo, addToCart } from '@/common/api';
	const id = ref('');
	const name = ref('');
	const picUrl = ref('');
	const description = ref('');
	const price = ref(0);
	
	onLoad((e) => {
		id.value = String(e.id);
		queryData();
	});

	const queryData = async () => {
	  try {
	    const response = await getGoodInfo(id.value);
	    if (!response.data.code) {
	      name.value = response.data.data.dishInfo.Name;
	      picUrl.value = response.data.data.dishInfo.Picture;
	      description.value = response.data.data.dishInfo.Description;
	      price.value = '￥' + response.data.data.dishInfo.Price;
	    }
	  } catch (error) {
	    console.error('获取商品数据失败：', error);
	  }
	};

	const addGoodToCart = async () => {
	  const token = uni.getStorageSync('token');
	  const params = {
	    dish_id: parseInt(id.value)
	  };
	  if (!token) {
	    uni.navigateTo({
	      url: '/pages/login/login'
	    });
	  } else {
	    try {
	      const response = await addToCart(params);
		  const cartId = response.data.data.cart_id;
		  
		  uni.setStorageSync('cart_id', cartId);
	      if (!response.data.code) {
	        uni.showToast({ title: '已加入购物车' });
	      }
	    } catch (error) {
	      console.error('加入购物车失败：', error);
	    }
	  }
	};

	
	const buyNow = (e) => {
	  const token = uni.getStorageSync('token');
	  let goodsId = e.currentTarget.dataset['id']
	  if (!token) {
	    uni.navigateTo({
	    	url: '/pages/login/login'
	    });
	  } else {
		uni.navigateTo({
		  	url: '/pages/order/order-confirm/order-confirm?id=' + goodsId
		})
	  }
	};
	
	// onMounted(() => {
	//   queryData();
	// });

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

	.img-container {
		display: flex;
		justify-content: center;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
		background-color: white;
	}

	.goods-img {
		width: 400rpx;
		height: 400rpx;
	}

	.goods-desc-img {
		display: flex;
		width: 100%;
	}

	.goods-info {
		border-radius: 10rpx;
		background-color: white;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 20rpx;
	}

	.goods-price {
		padding-top: 20rpx;
		padding-left: 20rpx;
		color: #ED9220;
	}

	.coupon-row {
		margin-left: 20rpx;
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
		align-items: center;
		/*子控件垂直居中*/
	}

	.coupon-sub-row {
		flex: 1;
	}

	.coupon-text {
		width: fit-content;
		border: 1rpx solid #ED9220;
		border-radius: 10rpx;
		padding: 10rpx;
		color: #ED9220;
	}

	.coupon-btn {
		background-color: #ED9220;
		color: white;
		padding: 5rpx 20rpx;
		border-top-left-radius: 1rem;
		border-bottom-left-radius: 1rem;
	}

	.goods-seller {
		margin-left: 20rpx;
		margin-top: 20rpx;
		background-color: #ED9220;
		color: white;
		padding: 5rpx 20rpx;
		width: fit-content;
		border-radius: 10rpx;
	}

	.goods-name {
		font-size: 35rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
		padding-bottom: 20rpx;
	}
	
	.goods-description {
		font-size: 25rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
		padding-bottom: 20rpx;
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
		background-color: #dfdfdf;
		height: 2rpx;
		margin-bottom: 20rpx;
	}

	.bottom-btns {
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  margin-top: 20rpx;
	}
	
	.add-to-cart {
		display: flex;
		flex-direction: row;
		flex: 1;
		margin-left: 100rpx;
	}

	.cart-text {
		font-size: 35rpx;
		color: #737373;
	}

	.cart-img {
		width: 50rpx;
		height: 50rpx;
	}
	
	.cart-btn, .buy-btn {
	  flex: 1;
	  font-size: 35rpx;
	  color: #fff;
	  background-color: #ED9220;
	  border-radius: 2rem;
	  padding: 20rpx;
	  text-align: center;
	  margin: 0 10rpx;
	}

	.tags-row {
		display: flex;
		flex-direction: row;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		background-color: #fafafa;
		align-items: center;
	}

	.tag-img {
		margin-left: 10rpx;
		width: 30rpx;
		height: 30rpx;
	}

	.tag-text1 {
		color: #222222;
		font-size: 30rpm;
	}

	.tag-text2 {
		color: #595d63;
		font-size: 30rpm;
	}
</style>
