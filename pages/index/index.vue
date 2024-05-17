<template>
	<view class="page-wrapper">
		<view class="search_wrapper" @tap="gotoSearch">
			<view class="search_row">
				<image class="search-img" src="/static/images/search.png"></image>
				<view class="search-text">点击搜索</view>
			</view>
		</view>
		
		<scroll-view class="tab-row" :scroll-x="true">
			<view :class="'tab  ' + (index == selectedCategory ? 'tab-selected' : '')" @tap="tabSelect" :data-id="index"
				v-for="(item, index) in categories" :key="item.k">
				{{ item.Category }}
			</view>
		</scroll-view>
		
		<view class="goods-row" @tap="gotoGoodsDetail" :data-id="item.DishId" v-for="(item, index) in goods" :key="item.k">
			<image class="goods-img" :src="item.Picture"></image>
				<view class="goods-desc">
					<view class="goods-name">{{ item.Name }}</view>
					<view class="goods-price">￥{{ item.Price }}</view>
				</view>
		</view>	
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { queryGoods, queryCategory, queryGoodsByCategory } from '@/common/api';

	const categories = ref([]);
	const goods = ref([]);
	const selectedCategory = ref(0);

	// 获取菜品分类列表
	const getCategories = async () => {
		try {
			const response = await queryCategory();
			categories.value = response.data.data.categories;
			getGoodsByCategory();
		} catch (error) {
			console.error('获取菜品分类失败：', error);
		}
	};
	
	// 根据分类查看菜品
	const getGoodsByCategory = async () => {
	  try {
		const response = await queryGoodsByCategory(selectedCategory.value + 1);
		goods.value = response.data.data.dishes; 
	  } catch (error) {
		console.error('获取当前分类下的菜品失败：', error);
	  }
	};

	
	const getCurrentCategoryId = () => {
		return categories.value[selectedCategory.value].CategoryID
	}
	
	const tabSelect = (e) => {
		selectedCategory.value = e.currentTarget.dataset.id
		getGoodsByCategory()
	}
	
	const gotoSearch = () => {
	  uni.navigateTo({
		url: '/pages/search/search'
	  });
	};
	
	const gotoGoodsDetail = (e) => {
		let goodsId = e.currentTarget.dataset['id']
		uni.navigateTo({
			url: '/pages/goods/goods?id=' + goodsId
		})
	}
	
	onMounted(() => {
	  getCategories();
	});
</script>

<style scoped>
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
		background-color: #ED9220;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}
	
	.search_row {
		display: flex;
		flex-direction: row;
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
		margin-left: 20rpx;
	}
	
	.tab-row {
		padding-top: 30rpx;
		width: 100%;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		white-space: nowrap;
		background-color: white;
	}
	
	.tab {
		width: 120rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		display: inline-block;
		padding-bottom: 10rpx;
		text-align: center;
	}
	
	.tab-selected {
		border-bottom: 4rpx solid;
		color: #ED9220;
	}
	
	.split-view {
		height: 30rpx;
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

