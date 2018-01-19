import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './styles.scss'

function WrapperForm({
  onSubmit,
  title,
  submitButton,
  cancelButton,
  children,
  white,
  className,
}) {
  return (
    <div
      className={classNames('WrapperForm', {
        'WrapperForm--White': white,
        [className]: className,
      })}
    >
      {title && (
        <div className="WrapperForm__Title">{title}</div>
      )}
      <form onSubmit={onSubmit}>
        {children}
        {cancelButton && (cancelButton)}
        {submitButton && (submitButton)}
      </form>
    </div>
  )
}

WrapperForm.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  submitButton: PropTypes.node.isRequired,
  cancelButton: PropTypes.node,
  children: PropTypes.node,
  white: PropTypes.bool,
}

WrapperForm.defaultProps = {

}

export default WrapperForm
