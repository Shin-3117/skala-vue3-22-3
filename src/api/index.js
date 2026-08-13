import weatherApi from './axios'

export { weatherApi }
export default weatherApi

/**
 * 위도(lat), 경도(lon)로 날씨 정보를 요청합니다.
 * @param {number|string} lat - 위도
 * @param {number|string} lon - 경도
 * @param {object} [options] - 추가 Axios 요청 옵션 또는 params
 */
export function getWeatherByCoords(lat, lon, options = {}) {
  return weatherApi.get('', {
    ...options,
    params: {
      lat,
      lon,
      ...options.params,
    },
  })
}

/**
 * 도시 이름(city)으로 날씨 정보를 요청합니다.
 * @param {string} city - 도시명 (예: 'Seoul')
 * @param {object} [options] - 추가 Axios 요청 옵션 또는 params
 */
export function getWeatherByCity(city, options = {}) {
  return weatherApi.get('', {
    ...options,
    params: {
      q: city,
      ...options.params,
    },
  })
}
