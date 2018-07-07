import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
	const result = await axios.get(baseUrl);
	return result.data;
};

const post = async (blog, token) => {
	const request = {
		method: 'POST',
		data: blog,
		url: baseUrl,
		headers: {
			'Authorization': `bearer ${token}`,
			'Content-Type': 'application/json'
		}
	};
	
	const result = await axios(request);
	return result.data;
};

const put = async (blog) => {
	const request = {
		method: 'PUT',
		data: blog,
		url: `${baseUrl}/${blog.id}`,
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const result = await axios(request);
	return result.data;
};

const remove = async (blog, token) => {
	const request = {
		method: 'DELETE',
		url: `${baseUrl}/${blog.id}`,
		headers: {
			'Authorization': `bearer ${token}`
		}
	};
	const result = await axios(request);
	return result.data;
};

export default {
	getAll,
	post,
	put,
	remove,
};
