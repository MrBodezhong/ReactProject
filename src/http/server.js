import axios from 'axios';
let basic_url = "http://127.0.0.1:3001"

function axios_get(url, params) {
	return new Promise((resolve, reject) => {
		axios({
			url: basic_url + url,
			method: 'GET',
			params: params
		}).then((res => {
			resolve(res.data)
		})).catch((err => {
			reject(err)
		}))
	})

}

function axios_post(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(basic_url + url, params).then((res => {
			resolve(res.data)
		})).catch((err => {
			reject(err)
		}))
	})

}

const http = {
	$get: function (url = '', params = {}) {
		return axios_get(url, params)
	},
	$post: function (url = '', params = {}) {
		return axios_post(url, params)
	}
}

export default http