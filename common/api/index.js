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

export function submitOrder(params) {
	return request(params, '/api/order/submit', 'post').then(resp => resp)
}

export function removeOrder(params) {
	return request(params, '/api/order/delete', 'post').then(resp => resp)
}

export function refundOrder(params) {
	return request(params, '/api/order/refund_request', 'post').then(resp => resp)
}

export function listOrder() {
	return request('', '/api/order/list', 'post').then(resp => resp)
}

export function searchOrder(params) {
	return request(params, '/api/order/items', 'post').then(resp => resp)
}

export function recharge(params) {
	return request(params, '/api/user/recharge', 'post').then(resp => resp)
}

export function commentOrder(params) {
	return request(params, '/api/order/comment', 'post').then(resp => resp)
}

export function login(params) {
	return request(params, '/api/auth/login', 'post').then(resp => resp)
}

export function register(params) {
	return request(params, '/api/auth/register', 'post').then(resp => resp)
}

export function getUserInfo() {
	return request('', '/api/user/info', 'post').then(resp => resp)

}