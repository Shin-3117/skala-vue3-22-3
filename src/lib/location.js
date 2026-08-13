import axios from 'axios'
import { REGIONS } from '@/data/weatherData.js'

/**
 * 두 좌표(lat1, lon1)과 (lat2, lon2) 사이의 직선 거리(km)를 구하는 Haversine 공식
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371 // 지구 반지름 (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * 주어진 위도/경도 좌표와 가장 가까운 대한민국 17개 주요 지역 찾기
 */
export function findNearestRegion(lat, lon) {
  if (lat == null || lon == null) return REGIONS[0] // 기본값: 서울

  let nearest = REGIONS[0]
  let minDistance = Infinity

  REGIONS.forEach((region) => {
    const dist = calculateDistance(lat, lon, region.lat, region.lon)
    if (dist < minDistance) {
      minDistance = dist
      nearest = region
    }
  })

  return { ...nearest, distanceKm: Math.round(minDistance) }
}

/**
 * 사용자 접속 위치 자동 감지
 * (1순위: Browser Geolocation API -> 2순위: geojs / ip-api IP Geolocation API)
 */
export async function detectUserLocation() {
  // 1. 브라우저 Geolocation API (기기 위치/GPS) 시도
  if (typeof window !== 'undefined' && 'geolocation' in navigator) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 4000,
          maximumAge: 300000,
        })
      })

      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const nearest = findNearestRegion(lat, lon)

      return {
        lat,
        lon,
        source: 'GPS 위치',
        nearestRegion: nearest,
      }
    } catch (err) {
      console.warn('Geolocation 접근 거부 또는 권한 없음. IP 기반 위치 감지로 전환합니다.', err)
    }
  }

  // 2. IP 기반 위치 감지 1차 시도 (geojs.io)
  try {
    const res = await axios.get('https://get.geojs.io/v1/ip/geo.json', { timeout: 3000 })
    if (res.data && res.data.latitude && res.data.longitude) {
      const lat = parseFloat(res.data.latitude)
      const lon = parseFloat(res.data.longitude)
      const nearest = findNearestRegion(lat, lon)

      return {
        lat,
        lon,
        source: 'IP 주소 감지',
        cityName: res.data.city || res.data.region,
        nearestRegion: nearest,
      }
    }
  } catch (err) {
    console.warn('IP 위치 감지 1차 시도 실패. 2차 시도 진행...', err)
  }

  // 2-2. IP 기반 위치 감지 2차 시도 (ip-api.com)
  try {
    const res = await axios.get('http://ip-api.com/json', { timeout: 3000 })
    if (res.data && res.data.status === 'success') {
      const lat = res.data.lat
      const lon = res.data.lon
      const nearest = findNearestRegion(lat, lon)

      return {
        lat,
        lon,
        source: 'IP 주소 감지',
        cityName: res.data.city || res.data.regionName,
        nearestRegion: nearest,
      }
    }
  } catch (err) {
    console.warn('IP 위치 감지 API 연결 실패. 기본 위치(서울)로 설정됩니다.', err)
  }

  // 3. 감지 실패 시 기본 설정 (서울)
  const defaultRegion = REGIONS[0]
  return {
    lat: defaultRegion.lat,
    lon: defaultRegion.lon,
    source: '기본 설정',
    nearestRegion: { ...defaultRegion, distanceKm: 0 },
  }
}
