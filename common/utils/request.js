import { baseURL } from './config'
function getType(data, method) {
	let type = {}
	const token = uni.getStorageSync('token')
	const authHeader = 'Bearer ' + token
	
	if (method == 'post' || method == 'put' || method == 'delete') {
		type = {
			method,
			data: {
				...data
			},
			header: {
				'content-type': 'application/json',
				'Authorization': authHeader
			}
		}
	} else {
		type = {
			method,
			params: {
				...data
			},
			header: {
				'Authorization': authHeader
			}
		}
	}
	return type
}

function Request(data, url, method) {
	return new Promise((resolve, reject) => {
		//uni.showLoading()
		uni.request({
			url: baseURL + url,
			...getType(data, method),
			success: res => {
				resolve(res)
			},
			fail: err => {
				//uni.hideLoading()
				console.log('err')
				reject(err)
			}
		})
	}).catch(err => console.log(err))
}


export default function(data, url, method) {
	return Request(data, url, method)
}