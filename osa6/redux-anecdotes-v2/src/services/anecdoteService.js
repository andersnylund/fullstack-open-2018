import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/anecdotes';

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const post = async (content) => {
	const response = await axios.post(baseUrl, { content, votes: 0 });
	return response.data;
};

const put = async (anecdote) => {
	const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
	return response.data;
};

export default {
	getAll,
	post,
	put
};