/**
 * Replace http protocol to https and conversely in the url
 * @param {string} url The url to rewrite
 */
const setSafeProtocol = (url) => (
  location.protocol + url.substr(url.indexOf('/'))
)

/**
 * Replace the 3XL size (default size coming from API) of the url by the new one
 * @param {string} url To picture url
 * @param {string} newSize The new site to set to the url picture
 */
const setNewPictureSize = (url, newSize) => url ? url.replace('_3XL', `_${newSize}`) : ''

/**
 * Transform the picture url with the correct protocol and the wanted size
 * @param {string} url The url to transform
 * @param {string} newSize The new size to set to the picture
 */
export const correctPictureUri = (url = '', newSize = 'XL') => setSafeProtocol(setNewPictureSize(url, newSize))

export const galleryToItems = (gallery) => gallery ? gallery.filter(cleanFilter).map((item) => ({
  original: correctPictureUri(item.url),
  thumbnail: correctPictureUri(item.url, 'S'),
  type: item.type,
  roomType: item.roomType,
  originalAlt: item.caption,
  description: item.caption,
})) : null

export const getFilterByName = (filters, name) => (typeof filters[name] !== 'undefined' ? filters[name] : false)
export const createLabel = (key, value = null, label = null) => ({ label, key, value })

const toLowerCase = (item) => item ? item.toLowerCase() : ''

export const cleanFilter = (elem, index, self) => {
  const name = toLowerCase(elem.url)
  return index === self.map((x) => toLowerCase(x.url)).indexOf(name)
}
