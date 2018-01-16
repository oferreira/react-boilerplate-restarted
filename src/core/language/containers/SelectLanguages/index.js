import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { makeSelectLanguages } from 'core/language/selectors'
import Select from 'html/components/Select'

const SelectLanguages = ({
  languages,
}) => {
  const items = Object.keys(languages).map((key) => ({
    key,
    value: languages[key],
  }))

  return (
    <div className="SelectLanguages">
      <Select items={items} />
    </div>
  )
}

SelectLanguages.propTypes = {
  languages: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  languages: makeSelectLanguages(),
})


const withConnect = connect(mapStateToProps)

export default compose(
  withConnect,
)(SelectLanguages)

