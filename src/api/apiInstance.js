import axios from 'axios'

const Instance = axios.create({
  baseURL: process.env.VUE_APP_URL_API,
  withCredentials: false,
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  }
})

Instance.interceptors.request.use((config) => {
  let token = null

  try {
    const adminStorage = localStorage.getItem('admin')
    const adminStorageJSON = JSON.parse(adminStorage)
    token = adminStorageJSON.token
  } catch (error) {
    console.log('error from file apiInstance.JS', error)
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default Instance