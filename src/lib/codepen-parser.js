const URL = 'https://codepen.io'
const BASE_REGEX = /http(s)?:\/\/(www\.)?codepen\.io\//

export function isCodepenUrl (url) {
  return BASE_REGEX.test(url)
}

export function getPenDataFromUrl (url) {
  let params = url.replace(BASE_REGEX, '').split('/')
  let user = params[0]
  let id = params[2]
  id = id.split('?')[0] // Remove query params
  let image = `${URL}/${user}/pen/${id}/image/small.png`

  return {
    user,
    id,
    image
  }
}
