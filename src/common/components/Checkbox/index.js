import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './styles.scss'

function Checkbox({
  input,
  name,
  meta,
  label,
  half,
  id,
  lightOnDark,
  ...custom
}) {
  const wrapperClasses = classNames('Checkbox', {
    'Checkbox--Half': half,
    'Checkbox--Light': lightOnDark,
  })
  const labelClasses = classNames('Checkbox__Input__Label', {
    'Checkbox__Input__Label--Light': lightOnDark,
  })
  return (
    <div className={wrapperClasses}>
      <input {...input} type="checkbox" id={id} className="Checkbox__Input" {...custom} />
      {label && (
        // eslint-disable-next-line
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      {meta && meta.touched && meta.error && (
        <span className="Checkbox__Error">{meta.error}</span>
      )}
    </div>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  half: PropTypes.bool,
  lightOnDark: PropTypes.bool,
  input: PropTypes.object,
  meta: PropTypes.object,
  id: PropTypes.any.isRequired,
}

Checkbox.defaultProps = {
  label: null,
  name: null,
  half: false,
}

export default Checkbox
