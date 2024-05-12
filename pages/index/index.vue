<template>
  <div class="container">
    <h2 class="title">菜品分类列表</h2>
    <ul class="category-list">
      <li v-for="category in categories" :key="category.id" class="category-item">{{ category.name }}</li>
    </ul>

    <h2 class="title">选择分类查看菜品</h2>
    <select v-model="selectedCategory" @change="getGoodsByCategory" class="category-select">
      <option disabled value="">请选择分类</option>
      <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
    </select>

    <h2 class="title">菜品列表</h2>
    <ul v-if="goods.length > 0" class="goods-list">
      <li v-for="good in goods" :key="good.id" class="good-item">{{ good.name }}</li>
    </ul>
    <p v-else class="no-goods">当前分类下没有可用的菜品。</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { queryCategory, queryGoodsByCategory } from '@/common/api';

const categories = ref([]);
const goods = ref([]);
const selectedCategory = ref('');

const fetchCategories = async () => {
  try {
    const response = await queryCategory();
    categories.value = response.data; // Assuming the response contains an array of categories
  } catch (error) {
    console.error('获取菜品分类失败：', error);
  }
};

const getGoodsByCategory = async () => {
  try {
    const response = await queryGoodsByCategory(selectedCategory.value);
    goods.value = response.data; // Assuming the response contains an array of goods for the selected category
  } catch (error) {
    console.error('获取当前分类下的菜品失败：', error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  margin-bottom: 5px;
  font-size: 18px;
}

.category-select {
  font-size: 16px;
  padding: 5px;
  margin-bottom: 10px;
}

.goods-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.good-item {
  margin-bottom: 5px;
  font-size: 16px;
}

.no-goods {
  font-style: italic;
  color: #888;
}
</style>

