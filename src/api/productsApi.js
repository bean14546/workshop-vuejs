import axios from '@/api/apiInstance'

export default {
  getAll: () => {
    return axios.get('products').then(response => response.data)
  },
  getById: (id) => {
    return axios.get(`products/${id}`).then(response => response.data)
  },
  create: (data) => {
    return axios.post('products/create', data).then(response => response.data)
  },
  update: (id, data) => {
    return axios.put(`products/update/${id}`, data).then(response => response.data)
  },
  delete: (id) => {
    return axios.delete(`products/delete/${id}`).then(response => response.data)
  }
}
