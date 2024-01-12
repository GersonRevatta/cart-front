import axios from 'axios'

const instance = axios.create({
  baseURL: window.API_URI
})

export default instance
