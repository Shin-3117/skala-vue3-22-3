import weatherApi from '@/api/axios'

// 가져와야 하는 17개 대한민국 주요 지역 좌표 정보
export const REGIONS = [
  { id: 'city_01', name: '서울', lat: 37.5665, lon: 126.9780 },
  { id: 'city_02', name: '부산', lat: 35.1796, lon: 129.0756 },
  { id: 'city_03', name: '대구', lat: 35.8714, lon: 128.6014 },
  { id: 'city_04', name: '인천', lat: 37.4563, lon: 126.7052 },
  { id: 'city_05', name: '광주', lat: 35.1595, lon: 126.8526 },
  { id: 'city_06', name: '대전', lat: 36.3504, lon: 127.3845 },
  { id: 'city_07', name: '울산', lat: 35.5384, lon: 129.3114 },
  { id: 'city_08', name: '세종', lat: 36.4800, lon: 127.2890 },
  { id: 'city_09', name: '경기', lat: 37.2636, lon: 127.0286 },
  { id: 'city_10', name: '충북', lat: 36.6424, lon: 127.4890 },
  { id: 'city_11', name: '충남', lat: 36.6588, lon: 126.6728 },
  { id: 'city_12', name: '전북', lat: 35.8242, lon: 127.1480 },
  { id: 'city_13', name: '전남', lat: 34.8160, lon: 126.4629 },
  { id: 'city_14', name: '경북', lat: 36.5684, lon: 128.7294 },
  { id: 'city_15', name: '경남', lat: 35.2280, lon: 128.6811 },
  { id: 'city_16', name: '제주', lat: 33.4996, lon: 126.5312 },
  { id: 'city_17', name: '강원', lat: 37.8813, lon: 127.7298 },
]

// 기본 초기 백업 데이터 (로딩 전 또는 API 연결 실패 시)
export const weatherDataList = REGIONS.map((region) => ({
  id: region.id,
  name: region.name,
  temp: 25,
  status: '맑음',
  tempMin: 21,
  tempMax: 28,
  feelsLike: 26,
  humidity: 60,
  wind: 3.0,
  dust: '좋음',
  uv: '보통',
  description: `${region.name} 지역의 날씨 정보를 불러오는 중입니다...`,
}))

// OpenWeather API 2.5 날씨 상태 매핑
export function parseWeatherStatus(weatherItem) {
  if (!weatherItem) return '맑음'
  const id = weatherItem.id
  const desc = weatherItem.description || ''

  if (id >= 200 && id < 600) {
    if (desc.includes('소나기') || id >= 520) return '소나기'
    return '비'
  }
  if (id >= 600 && id < 700) return '눈'
  if (id >= 700 && id < 800) return '흐림'
  if (id === 800) return '맑음'
  if (id === 801 || id === 802) return '구름많음'
  if (id === 803 || id === 804) return '흐림'

  return '맑음'
}

// 개별 지역 API 요청 함수
export async function fetchCityWeatherFromApi(region) {
  const response = await weatherApi.get('', {
    params: {
      lat: region.lat,
      lon: region.lon,
      units: 'metric',
      lang: 'kr',
    },
  })

  const apiData = response.data
  const weatherObj = apiData.weather?.[0] || {}
  const mainObj = apiData.main || {}
  const windObj = apiData.wind || {}

  const temp = Math.round(mainObj.temp ?? 25)
  const tempMin = Math.round(mainObj.temp_min ?? (temp - 3))
  const tempMax = Math.round(mainObj.temp_max ?? (temp + 3))
  const feelsLike = Math.round(mainObj.feels_like ?? temp)
  const humidity = mainObj.humidity ?? 60
  const wind = Math.round((windObj.speed ?? 3.0) * 10) / 10
  const status = parseWeatherStatus(weatherObj)
  const rawDesc = weatherObj.description || status

  return {
    id: region.id,
    name: region.name,
    temp,
    status,
    tempMin,
    tempMax,
    feelsLike,
    humidity,
    wind,
    dust: '좋음',
    uv: '보통',
    description: `${region.name}의 현재 기상 상태는 '${rawDesc}'입니다. (OpenWeather 2.5 실시간 데이터)`,
    rawApiData: apiData,
  }
}

// 17개 지역 전체 API 병렬 요청 함수
export async function fetchAllCitiesWeather() {
  const results = await Promise.allSettled(
    REGIONS.map((region) => fetchCityWeatherFromApi(region))
  )

  return REGIONS.map((region, index) => {
    const result = results[index]
    if (result.status === 'fulfilled') {
      return result.value
    }
    // 실패 시 기본 데이터 활용
    return {
      ...weatherDataList[index],
      description: `${region.name} 지역 API 연결에 실패하여 기본 정보를 표시합니다.`,
    }
  })
}

// ID 또는 지역명으로 조회
export function getCityByIdOrName(query, list = weatherDataList) {
  if (!query) return null
  const decoded = decodeURIComponent(query).trim().toLowerCase()
  return (
    list.find(
      (item) =>
        item.id.toLowerCase() === decoded ||
        item.name.toLowerCase() === decoded
    ) || null
  )
}
