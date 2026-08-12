export const weatherDataList = [
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', tempMin: 24, tempMax: 31, feelsLike: 29, humidity: 55, wind: 3.2, dust: '좋음', uv: '보통', description: '쾌청한 하늘과 햇살이 눈부신 날씨입니다. 야외 활동하기 적합합니다.' },
  { id: 'city_02', name: '부산', temp: 24, status: '구름많음', tempMin: 21, tempMax: 26, feelsLike: 25, humidity: 70, wind: 4.5, dust: '좋음', uv: '낮음', description: '해안가를 중심으로 구름이 많고 시원한 바람이 붑니다.' },
  { id: 'city_03', name: '대구', temp: 31, status: '맑음', tempMin: 25, tempMax: 34, feelsLike: 33, humidity: 48, wind: 2.1, dust: '보통', uv: '높음', description: '낮 동안 기온이 크게 올라 더위 대비가 필요합니다. 수분 섭취를 해주세요.' },
  { id: 'city_04', name: '인천', temp: 27, status: '맑음', tempMin: 23, tempMax: 29, feelsLike: 28, humidity: 62, wind: 3.8, dust: '좋음', uv: '보통', description: '맑은 하늘 아래 바람이 다소 붑니다.' },
  { id: 'city_05', name: '광주', temp: 29, status: '비', tempMin: 23, tempMax: 30, feelsLike: 31, humidity: 82, wind: 2.9, dust: '좋음', uv: '낮음', description: '소나기성 비가 내릴 수 있으니 우산을 챙기시기 바랍니다.' },
  { id: 'city_06', name: '대전', temp: 28, status: '맑음', tempMin: 23, tempMax: 31, feelsLike: 29, humidity: 58, wind: 2.5, dust: '좋음', uv: '보통', description: '온화하고 자외선 지수가 보통 수준을 유지합니다.' },
  { id: 'city_07', name: '울산', temp: 27, status: '구름많음', tempMin: 22, tempMax: 28, feelsLike: 28, humidity: 68, wind: 3.9, dust: '좋음', uv: '보통', description: '동해안 산발적 구름이 많으며 가끔 햇살이 비춥니다.' },
  { id: 'city_08', name: '세종', temp: 28, status: '맑음', tempMin: 22, tempMax: 30, feelsLike: 29, humidity: 56, wind: 2.2, dust: '좋음', uv: '보통', description: '공기가 깨끗하고 온화한 기온을 보입니다.' },
  { id: 'city_09', name: '경기', temp: 27, status: '흐림', tempMin: 22, tempMax: 29, feelsLike: 28, humidity: 65, wind: 2.7, dust: '보통', uv: '낮음', description: '대기 전반에 구름이 깔려 있으며 비교적 선선합니다.' },
  { id: 'city_10', name: '충북', temp: 29, status: '맑음', tempMin: 23, tempMax: 31, feelsLike: 30, humidity: 54, wind: 2.3, dust: '좋음', uv: '보통', description: '맑고 고요한 날씨로 미세먼지 농도가 낮습니다.' },
  { id: 'city_11', name: '충남', temp: 28, status: '구름많음', tempMin: 23, tempMax: 30, feelsLike: 29, humidity: 60, wind: 2.6, dust: '좋음', uv: '보통', description: '구름 사이로 강한 햇빛이 내리쬐는 곳이 있습니다.' },
  { id: 'city_12', name: '전북', temp: 29, status: '비', tempMin: 23, tempMax: 30, feelsLike: 31, humidity: 85, wind: 3.1, dust: '좋음', uv: '낮음', description: '산발적인 빗방울이 떨어지고 있으며 습도가 높습니다.' },
  { id: 'city_13', name: '전남', temp: 30, status: '흐림', tempMin: 24, tempMax: 31, feelsLike: 32, humidity: 75, wind: 3.4, dust: '보통', uv: '낮음', description: '흐린 날씨 속에 습도가 무덥게 느껴집니다.' },
  { id: 'city_14', name: '경북', temp: 30, status: '맑음', tempMin: 24, tempMax: 32, feelsLike: 32, humidity: 50, wind: 2.8, dust: '보통', uv: '높음', description: '햇빛이 강하여 자외선 차단제 착용이 권장됩니다.' },
  { id: 'city_15', name: '경남', temp: 28, status: '구름많음', tempMin: 23, tempMax: 29, feelsLike: 29, humidity: 66, wind: 3.3, dust: '좋음', uv: '보통', description: '바람이 불어 활동하기 양호한 구름 날씨입니다.' },
  { id: 'city_16', name: '제주', temp: 24, status: '소나기', tempMin: 22, tempMax: 27, feelsLike: 26, humidity: 88, wind: 5.2, dust: '좋음', uv: '낮음', description: '강한 바람과 함께 소나기가 내리고 있습니다.' },
  { id: 'city_17', name: '강원', temp: 23, status: '흐림', tempMin: 19, tempMax: 25, feelsLike: 24, humidity: 72, wind: 2.4, dust: '좋음', uv: '낮음', description: '산간 지역을 중심으로 흐리고 시원한 바람이 붑니다.' },
]

export function getCityByIdOrName(query) {
  if (!query) return null
  const decoded = decodeURIComponent(query).trim().toLowerCase()
  return weatherDataList.find(
    (item) =>
      item.id.toLowerCase() === decoded ||
      item.name.toLowerCase() === decoded
  ) || null
}
