import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './styles.scss'

function RadioButton({
  input,
  name,
  meta,
  label,
  half,
  id,
  ...custom
}) {
  const wrapperClass = classNames('RadioButton', {
    'RadioButton--Half': half,
  })
  return (
    <div className={wrapperClass}>
      <input {...input} type="radio" id={id} className="RadioButton__Input" {...custom} />
      {label && (
        // eslint-disable-next-line
        <label htmlFor={id} className="RadioButton__Input__Label">
          {label}
        </label>
      )}
      {meta && meta.touched && meta.error && (
        <span className="RadioButton__Error">{meta.error}</span>
      )}
    </div>
  )
}

RadioButton.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  half: PropTypes.bool,
  input: PropTypes.object,
  meta: PropTypes.object,
  id: PropTypes.any.isRequired,
}

RadioButton.defaultProps = {
  label: null,
  name: null,
  half: false,
}

export default RadioButton
