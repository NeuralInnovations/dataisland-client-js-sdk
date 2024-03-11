export const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value || ""};`
}
  
export const getCookie = (name: string) => {
  const nameValidator = `${name}=`
  const cookieItems = document.cookie.split(";")

  for (let index = 0; index < cookieItems.length; index++) {
    let cookie = cookieItems[index]

    while (cookie.charAt(0) === " ")
      cookie = cookie.substring(1, cookie.length)

    if (cookie.indexOf(nameValidator) === 0)
      return cookie.substring(nameValidator.length, cookie.length)
  }

  return null
}

export const createFingerprint = () => {
  const fingerprint = new Map<string, any>()

  fingerprint.set("userAgent", navigator.userAgent)
  fingerprint.set("language", navigator.language)
  fingerprint.set("hardware_concurrency", navigator.hardwareConcurrency)
  fingerprint.set("cookie_enabled", navigator.cookieEnabled)
  fingerprint.set("pixel_ratio", window.devicePixelRatio)
  fingerprint.set("session_storage", window.sessionStorage)
  fingerprint.set("local_storage", window.localStorage)

  return fingerprint
}