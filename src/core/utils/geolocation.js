import { Session } from 'core/utils/session'

export const getGeolocation = () => {
  let x
  const values = {}
  const reg = /([_a-z]\w*)=\s*?([^,]*)/gi
  while (( x = reg.exec(Session.get('x-akamai-edgescape'))) !== null) values[x[1]] = x[2] // eslint-disable-line
  return values
}

export const getCountry = () => {
  const geolocation = getGeolocation()
  return (typeof geolocation.country_code !== 'undefined' ? geolocation.country_code : '')
}

export const getCurrentPosition = () => (
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error)
    )
  })
)
