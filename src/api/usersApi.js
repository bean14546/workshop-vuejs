import axios from '@/api/apiInstance'

export default {
  getAll: () => {
    return axios.get('users').then(response => response.data)
  },
  getById: (id) => {
    return axios.get(`users/${id}`).then(response => response.data)
  },
  create: (data) => {
    return axios.post('users/create', data).then(response => response.data)
  },
  update: (id, data) => {
    return axios.put(`users/update/${id}`, data).then(response => response.data)
  },
  delete: (id) => {
    return axios.delete(`users/delete/${id}`).then(response => response.data)
  },
  login: (data) => {
    return axios.post('users/login', data).then(response => response.data)
  },
  logout: (token) => {
    return axios.post('users/logout', token).then(response => response.data)
  }
}
