import request from '../utils/request'
import axios from 'axios';

export function queryCategory() {
	return request('', '/api/category/list', 'get').then(resp => resp)
}

export function queryGoodsByCategory(category_id) {
	return request('', `/api/dish/category?category_id=${category_id}`, 'get').then(resp => resp)
}

export function queryGoods() {
	return request('', '/api/dish/list', 'get').then(resp => resp)
}

export function getGoodInfo(id) {
	return request('', `/api/dish/info?id=${id}`, 'get').then(resp => resp)
}

export function getDishImage(dishId) {
  return request('', `/api/dish/image?id=${dishId}`, 'get').then(resp => resp)
}

export function addToCart(params) {
  return request(params, '/api/cart/add', 'post').then(resp => resp);
}

export function queryCart(cart_id) {
  return request('', `/api/cart/info?cart_id=${cart_id}`, 'get').then(resp => resp);
}

export function deleteCart(params) {
	return request(params, '/api/cart/delete', 'delete').then(resp => resp);
}

export function search(keyword) {
	return request('', `/api/dish/search?keyword=${keyword}`, 'get').then(resp => resp)
}

export function login(params) {
	return request(params, '/api/auth/login', 'post').then(resp => resp)
}

export function register(params) {
	return request(params, '/api/auth/register', 'post').then(resp => resp)
}