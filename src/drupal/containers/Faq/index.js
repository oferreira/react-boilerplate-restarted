import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import InjectDrupalFaq from 'drupal/hoc/InjectDrupalFaq'

const Faq = ({
  faq,
}) => {
  const content = faq.map((val, key) => (
    <div key={key} className="Faq__Container">
      <div className="Faq__Title">{val.title}</div>
      <div className="Faq__Description">{val.body}</div>
    </div>
  ))

  if (!faq) {
    return (
      <div>Booh</div>
    )
  }

  return (
    <div className="Faq">
      <div>Faaaaq</div>
      <div>{ content }</div>
    </div>
  )
}

Faq.propTypes = {
  faq: PropTypes.object,
}

Faq.defaultProps = {
  faq: {},
}

export default compose(
  InjectDrupalFaq,
)(Faq)
