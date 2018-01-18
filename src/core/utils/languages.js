/* global config */
import moment from 'moment'

/**
 * Provides user locale for the current context
 */
export const getUserLocale = () => localStorage.locale ? localStorage.locale : navigator.language

/**
 * Provides fallback locale for the current context
 */
export const getFallbackLocale = () => config.language.default

/**
 * Provides the short language part of the given locale
 * Useful for matching full ISO / composed locales (eg. fr-be => fr)
 * @param {String} locale locale value to format
 */
export const getLocaleLanguage = (locale) => locale ? locale.split('-')[0].toLocaleLowerCase() : null

/**
 * Provides an ISO locale according the given input
 * Looks for an occurence and returns null if not found
 * @param {Object} list  List to filter
 * @param {String} input Input value to look for
 */
export const getIsoLocale = (list, input) =>
  Object.keys(list).map((language) => language).find((locale) => {
    // Ensures comparing based on the input length to match all cases
    const checkLength = (value) => value.split('-').slice(0, input.split('-').length).join('-')
    return input.split('-')[0] === locale.split('-')[0] ? (checkLength(input).toLocaleLowerCase() === checkLength(locale).toLocaleLowerCase() ? locale : null) : null; //eslint-disable-line
  }
  )

/**
 * Provides a filtered and formatted application locale
 * Workflow :
 * 1. Uses given forceLocale and match with the provided languages list
 * 2. Fetchs user language and match with the provided languages list
 * 3. Uses fallback locale without languages list comparison
 * @param {Object} languages   languages list reference to compare with
 * @param {String} forceLocale explicit locale to match with locales list
 */
export const defineAppLocale = (languages = {}, forceLocale = null) => {
  const userLocale = getUserLocale()
  const fallbackLocale = getFallbackLocale()
  return getIsoLocale(languages, forceLocale || userLocale) || fallbackLocale
}

/**
 * Update moment according to the format locale
 * @param {String} lang The current language to get with moment
 */
export const updateMomentLocale = (lang = '') => {
  // Convert local to iso format
  const baseLocale = 'en'
  const baseMomentLocale = 'en-au'
  let locale = getLocaleLanguage(lang) || baseMomentLocale
  locale = locale === 'zh' ? 'zh-cn' : locale
  // Translate to locale language
  const localeFormat = locale !== baseLocale
    ? require(`moment/src/locale/${locale}`) // eslint-disable-line
    : require(`moment/src/locale/${baseMomentLocale}`); // eslint-disable-line

  moment.updateLocale(locale, localeFormat)
}
