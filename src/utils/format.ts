/**
 * 전화번호의 가운데 4자리를 마스킹 처리하는 함수
 * @param phoneNumber - 마스킹할 전화번호
 * @returns 마스킹된 전화번호 (예: 010-xxxx-5678)
 */
export const maskPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) return ""

  // 전화번호에서 하이픈 제거
  const cleaned = phoneNumber.replace(/-/g, "")

  // 전화번호가 11자리가 아닌 경우 원본 반환
  if (cleaned.length !== 11) return phoneNumber

  // 앞 3자리, 뒤 4자리 추출
  const front = cleaned.slice(0, 3)
  const back = cleaned.slice(-4)

  // 마스킹 처리하여 반환
  return `${front}-xxxx-${back}`
}

/**
 * 닉네임의 첫 글자만 보여주고 나머지는 '*'로 마스킹 처리하는 함수
 * @param nickname - 마스킹할 닉네임
 * @returns 마스킹된 닉네임 (예: "홍길동" -> "홍**", "김철" -> "김*")
 */
export const maskNickname = (nickname: string): string => {
  let visiblePart = ""
  let maskedPart = ""

  if (!nickname) return ""
  if (nickname.length <= 1) return nickname
  else if (nickname.length === 2) {
    visiblePart = nickname.slice(0, 1)
    maskedPart = "*".repeat(nickname.length - 1)
  } else {
    visiblePart = nickname.slice(0, 2)
    maskedPart = "*".repeat(nickname.length - 1)
  }

  return `${visiblePart}${maskedPart}`
}

/**
 * ISO 형식의 날짜 문자열을 'YYYY-MM-DD HH:mm' 형식으로 변환하는 함수
 * @param dateString - ISO 형식의 날짜 문자열 (예: "2025-02-17T21:51:31.140616")
 * @returns 포맷팅된 날짜 문자열 (예: "2025-02-17 21:51")
 */
export const formatDateTime = (dateString: string): string => {
  if (!dateString) return ""

  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")

  return `${year}-${month}-${day} ${hours}:${minutes}`
}
