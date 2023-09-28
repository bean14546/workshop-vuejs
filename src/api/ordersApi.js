import axios from '@/api/apiInstance'

export default {
  getAll: () => {
    return axios.get('orders').then(response => response.data)
  },
  getById: (id) => {
    return axios.get(`orders/${id}`).then(response => response.data)
  },
  create: (data) => {
    return axios.post('orders/create', data).then(response => response.data)
  },
  update: (id, data) => {
    return axios.put(`orders/update/${id}`, data).then(response => response.data)
  },
  delete: (id) => {
    return axios.delete(`orders/delete/${id}`).then(response => response.data)
  }
}
