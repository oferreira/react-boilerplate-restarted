export function createUrl(url, params = {}) {
  const keys = Object.keys(params)
  if (keys.length) {
    keys.forEach((k) => {
      if (typeof params[k] === 'object') {
        let flatten = ''
        params[k].forEach((ref) => {
          flatten += (flatten === '' ? ref : `&${k}=${ref}`)
        })
        url = url.replace(`{${k}}`, flatten) // eslint-disable-line
      } else {
        url = url.replace(`{${k}}`, params[k]) // eslint-disable-line
      }
    })
  }
  return url
}

export class Api {
  static url(url, params = {}) {
    const keys = Object.keys(params)
    if (keys.length) {
      keys.forEach((k) => {
        if (typeof params[k] === 'object') {
          let flatten = ''
          params[k].forEach((ref) => {
            flatten += (flatten === '' ? ref : `&${k}=${ref}`)
          })
          url = url.replace(`{${k}}`, flatten); // eslint-disable-line
        } else {
          url = url.replace(`{${k}}`, params[k]); // eslint-disable-line
        }
      })
    }
    return url
  }
}
