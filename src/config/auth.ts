import Cookies from 'js-cookie'

const JSESSIONID = 'token'

export function getToken() {
  return Cookies.get(JSESSIONID)
}

export function setToken() {
  return Cookies.set(JSESSIONID, 'JSESSIONID')
}

export function removeToken() {
  Cookies.set(JSESSIONID, '')
  return Cookies.remove(JSESSIONID)
}
