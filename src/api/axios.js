import axios from 'axios'

// OpenWeather API 전용 Axios 인스턴스 생성
const weatherApi = axios.create({
  baseURL: import.meta.env.VITE_API_OPEN_WEATHER_API_URL,
  timeout: 10000,
})

// 요청 인터셉터: 모든 요청의 searchParams(params)에 appid(API Key) 자동 추가
weatherApi.interceptors.request.use(
  (config) => {
    config.params = {
      appid: import.meta.env.VITE_API_OPEN_WEATHER_API_KEY,
      ...config.params,
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default weatherApi
