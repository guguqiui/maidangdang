import request from '../utils/request'

export function queryCategory() {
	return request('', '/api/category/list', 'get').then(resp => resp)
}

export function queryGoodsByCategory(category_id) {
	return request('', `/api/dish/category?category_id=${category_id}`, 'get').then(resp => resp)
}

export function queryGoods() {
	return request('', '/api/dish/list', 'get').then(resp => resp)
}

export function getGoodInfo() {
	return request('', '/api/dish/info', 'get').then(resp => resp)
}

export function addToCart() {
	return request('', '/api/cart/add', 'post').then(resp => resp)
}

export function login(params) {
	return request(params, '/api/auth/login', 'post').then(resp => resp)
}

export function register(params) {
	return request(params, '/api/auth/register', 'post').then(resp => resp)
}