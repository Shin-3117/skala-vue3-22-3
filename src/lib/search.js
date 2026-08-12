import { canBeChoseong, getChoseong } from 'es-hangul'

const normalize = (value) => value.trim().toLowerCase()

// 검색어 한 글자가 대상 한 글자와 맞는지 판단합니다.
// 'ㅅ' 처럼 초성만 입력한 경우 대상 글자의 초성과 비교합니다.
const matchCharacter = (target, keyword) => {
  if (target === keyword) return true
  return canBeChoseong(keyword) && getChoseong(target) === keyword
}

/**
 * 초성 검색을 지원하는 문자열 포함 검사.
 * '서울' / 'ㅅㅇ' / '서ㅇ' 모두 '서울'을 찾습니다.
 */
export function includesChoseong(text, query) {
  const target = normalize(text)
  const keyword = normalize(query)

  if (!keyword) return true
  if (keyword.length > target.length) return false

  for (let start = 0; start <= target.length - keyword.length; start += 1) {
    const matched = [...keyword].every((char, index) => matchCharacter(target[start + index], char))
    if (matched) return true
  }

  return false
}
