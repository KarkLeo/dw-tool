import axios from 'axios'
import {
  AddTokenInterceptor,
  RemoveTokenInterceptor,
} from 'src/services/interceptors/auth'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/'

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  },
})

instance.interceptors.request.use(AddTokenInterceptor, (error) =>
  Promise.reject(error)
)

instance.interceptors.response.use((res) => res, RemoveTokenInterceptor)

export default instance
