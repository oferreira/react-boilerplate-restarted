import { checkCreditCard } from 'core/utils/validateCreditCard'

const validate = (values) => {
  const errors = {}
  // if (!values.get('gender')) errors.gender = 'Required'
  if (!values.get('firstName')) errors.firstName = 'Required'
  if (!values.get('lastName')) errors.lastName = 'Required'
  if (!values.get('email')) errors.email = 'Required'
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) errors.email = 'Invalid email address'
  if (!values.get('phone')) errors.phone = 'Required'
  if (!values.get('country') || values.get('country') === '0') errors.country = 'Required'
  if (!values.get('generalConditions')) errors.generalConditions = 'Required'
  if (!values.get('phoneCode')) errors.phoneCode = 'Required'

  if (typeof values.get('cardCode') !== 'undefined') {
    if (!values.get('cardCode')) errors.cardCode = 'Required'
    if (!values.get('cardHolderName')) errors.cardHolderName = 'Required'
    if (!values.get('cardNumber')) errors.cardNumber = 'Required'
    else if (checkCreditCard(values.get('cardNumber'), values.get('cardCode')) <= 0) errors.cardNumber = 'Invalid'
    if (!values.get('year')) errors.year = 'Required'
    if (!values.get('month')) errors.month = 'Required'
  }

  return errors
}

export default validate
