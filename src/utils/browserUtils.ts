const getDocument = () => {
  if (!(globalThis as any).document) {
    (globalThis as any).document = {
      cookie: ""
    }
  }
  return document
}

const getNavigator = () => {
  if (!(globalThis as any).navigator) {
    (globalThis as any).navigator = {
      userAgent: "",
      language: "",
      hardwareConcurrency: 0,
      cookieEnabled: false
    }
  }
  return navigator
}

const getWidow = () => {
  if (!(globalThis as any).window) {
    (globalThis as any).window = {
      devicePixelRatio: 16 / 9.0,
      sessionStorage: {},
      localStorage: {}
    }
  }
  return window
}

export const setCookie = (name: string, value: string | undefined): void => {
  const doc = getDocument()
  doc.cookie = `${name}=${value || ""};`
}

export const getCookie = (name: string): string | undefined => {
  const doc = getDocument()
  const nameValidator = `${name}=`
  const cookieItems = doc.cookie.split(";")

  for (let index = 0; index < cookieItems.length; index++) {
    let cookie = cookieItems[index]

    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length)
    }

    if (cookie.indexOf(nameValidator) === 0) {
      return cookie.substring(nameValidator.length, cookie.length)
    }
  }

  return undefined
}

export const createFingerprint = () => {
  const nav = getNavigator()
  const win = getWidow()
  const fingerprint = new Map<string, any>()

  fingerprint.set("userAgent", nav.userAgent)
  fingerprint.set("language", nav.language)
  fingerprint.set("hardware_concurrency", nav.hardwareConcurrency)
  fingerprint.set("cookie_enabled", nav.cookieEnabled)
  fingerprint.set("pixel_ratio", win.devicePixelRatio)
  fingerprint.set("session_storage", win.sessionStorage)
  fingerprint.set("local_storage", win.localStorage)

  return fingerprint
}
