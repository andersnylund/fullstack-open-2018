import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
	return axios
		.get(baseUrl)
		.then(_dataMapper)
}

const create = (person) => {
	return axios
		.post(baseUrl, person)
		.then(_dataMapper)
}

const remove = (id) => {
	return axios
		.delete(`${baseUrl}/${id}`)
}

const _dataMapper = (response) => {
	return response.data
}

export default { getAll, create, remove }