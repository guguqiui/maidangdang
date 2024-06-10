<template>
  <view class="page-wrapper">
    <view class="search_wrapper">
      <view class="search_row">
        <image class="search-img" src="/static/images/search.png"></image>
        <input class="search-input" placeholder="点击搜索" @input="_bindinput" />
      </view>
      <view class="search-text" :auto-focus="true" @tap="searchGoods">搜索</view>
    </view>

     <view class="goods-row" @tap="gotoGoodsDetail" :data-id="item.DishId" v-for="(item, index) in goodsList" :key="item.k">
      <image class="goods-img" :src="item.Picture"></image>
      <view class="goods-desc">
        <view class="goods-name">{{ item.Name }}</view>
        <view class="goods-price">￥{{ item.Price }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { search, getDishImage } from '@/common/api';

	const goodsList = ref([]);
	const keyword = ref('');
	const router = useRouter();

	const _bindinput = (e) => {
		keyword.value = e.detail.value;
	};

	const searchGoods = async () => {
		try {
			const response = await search(keyword.value);
			if (!response.data.code) {
				const dishes = response.data.data.dishes;
				// 逐个获取所有菜品的图片数据
				for (const dish of dishes) {
					try {
						const imageResponse = await getDishImage(dish.DishId);
						dish.Picture = `data:image/jpeg;base64,${imageResponse.data.data.image}`;
					} catch (imageError) {
						console.error(`获取图片失败: ${imageError}`);
						// 如果获取图片失败，可以选择设置一个默认图片或处理错误
						dish.Picture = '';
					}
				}
				goodsList.value = dishes;
			}
		} catch (error) {
			console.error('搜索商品失败：', error);
		}
	};

	const gotoGoodsDetail = (e) => {
		let goodsId = e.currentTarget.dataset['id']
		uni.navigateTo({
			url: '/pages/goods/goods?id=' + goodsId
		});
	};
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

	.search_wrapper {
		display: flex;
		flex-direction: row;
		background-color: #ED9220;
		padding-bottom: 20rpx;
		align-items: center;
	}

	.search_row {
		display: flex;
		flex-direction: row;
		flex: 1;
		background-color: white;
		border-radius: 10rem;
		margin-left: 1rem;
		margin-right: 1rem;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		align-items: center;
	}

	.search-img {
		height: 40rpx;
		width: 40rpx;
		margin-left: 20rpx;
	}

	.search-text {
		color: #fff;
		margin-right: 1rem;
	}

	.search-input {
		margin-left: 20rpx;
	}

	.goods-row {
		display: flex;
		flex-direction: row;
		background-color: #fff;
		border-radius: 10rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		padding: 20rpx;
	}

	.goods-img {
		margin-left: 40rpx;
		width: 200rpx;
		height: 200rpx;
	}

	.goods-desc {
		display: flex;
		flex-direction: column;
		margin-left: 40rpx;
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

	.goods-price {
		margin-top: 20rpx;
		color: #ED9220;
	}
</style>

