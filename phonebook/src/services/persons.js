import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (newObject) => {
  return axios.put(`${baseUrl}/${newObject.id}`, newObject)
}

const personService = {
  getAll: getAll,
  create: create,
  remove: remove,
  update: update
}

export default personService