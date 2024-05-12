import request from '../utils/request'

export function queryCategory() {
	return request('', '/api/dish/list', 'get').then(resp => resp)
}

export function queryGoodsByCategory(category_id) {
	return request('', '/api/dish/category?category_id=${category_id}', 'get').then(resp => resp);
}

export function login(params) {
	return request(params, 'user/login', 'post').then(resp => resp)
}

export function register(params) {
	return request(params, 'user/register', 'post').then(resp => resp)
}