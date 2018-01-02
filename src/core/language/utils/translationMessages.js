import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import enTranslationMessages from 'translations/en.json'

// delete
const DEFAULT_LOCALE = 'en'
export const appLocales = [
  'en',
]

addLocaleData(enLocaleData)

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {}
  return Object.keys(messages).reduce((formattedMessages, key) => {
    let message = messages[key]
    if (!message && locale !== DEFAULT_LOCALE) {
      message = defaultFormattedMessages[key]
    }
    return Object.assign(formattedMessages, { [key]: message })
  }, {})
}

export default {
  en: formatTranslationMessages('en', enTranslationMessages),
}
