import React from 'react'
import PropTypes from 'prop-types'
import { isBurgerOpen } from 'common/selectors/burgerMenu'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import './styles.scss'

const Logo = ({ burgerIsOpen }) => (
  <span className="Logo">
    <svg style={{ width: '160px' }} className={`Logo__Img ${burgerIsOpen ? 'Logo__Img--burgerOpened' : ''}`} baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140.5 20" overflow="scroll"><path d="M108.5 5.3h-4.3v10h1.8v-3.2h2.5c1.9 0 3.4-1.5 3.4-3.4s-1.5-3.4-3.4-3.4zm1.5 3.4c0 .9-.6 1.7-1.5 1.7H106V7h2.4c.9 0 1.6.7 1.6 1.7 0-.1 0 0 0 0zM124.8 11.9l1.4 1.6 2.9-2.7 6.3 7.1h-7.8c-4.4 0-7.9-3.5-7.9-7.9s3.5-7.9 7.9-7.9h7.6l-4.2 4 1.4 1.6 8.1-7.7h-12.9c-5.5 0-10 4.5-10 10s4.5 10 10 10H140L129.2 7.7l-4.4 4.2zM17.2 5.1h-.5c-2.9-.1-5.3 2.1-5.4 5-.1 2.9 2.1 5.3 5 5.4h.5c2.9.1 5.3-2.1 5.4-5 .1-2.8-2.1-5.3-5-5.4zm3 5.2c0 1.9-1.5 3.5-3.4 3.6h-.1c-1.9 0-3.5-1.5-3.5-3.4v-.1c-.2-1.9 1.2-3.7 3.1-3.9 1.9-.2 3.7 1.2 3.9 3.1.1.2.1.5 0 .7zM36.3 5.3h-3.6v10h3.6c3.4 0 5.2-2 5.2-5s-1.8-5-5.2-5zm-.1 8.4h-1.7V6.9h1.7c2.6 0 3.6 1.5 3.6 3.4 0 2-1 3.4-3.6 3.4zM4.9 11.1h2.8V13c-.7.6-1.5.9-2.4.9-1.9 0-3.5-1.5-3.5-3.4v-.2c0-1.9 1.5-3.5 3.4-3.6h.1c.9 0 1.9.3 2.5 1L9 6.6c-1-1-2.3-1.5-3.7-1.5C2.4 5.1.1 7.4.1 10.3s2.3 5.2 5.2 5.2c1.6 0 3.1-.7 4.1-1.9v-4H4.9v1.5zM26.2 5.3h-1.8v10h5.8v-1.6h-4M85.2 11.3c0 1.8-.9 2.6-2.3 2.6s-2.3-.8-2.3-2.6v-6h-1.8v6.2c0 2.2 1.8 4.1 4.1 4.1 2.2 0 4.1-1.8 4.1-4.1V5.3h-1.8v6zM92 5.3h-1.8v10h5.7v-1.6H92M98.7 5.3h1.8v10h-1.8zM68.7 6.9h3v8.4h1.8V6.9h3V5.3h-7.8M60.9 12.2l-5.3-6.9H54v10h1.7V8.2l5.5 7.1h1.4v-10h-1.7M46 10.9h4.3V9.3H46V6.9h4.6V5.3h-6.4v10h6.5v-1.6H46" /></svg>
  </span>
)

Logo.propTypes = {
  burgerIsOpen: PropTypes.bool,
}

Logo.defaultProps = {
  burgerIsOpen: false,
}

const mapStateToProps = createStructuredSelector({
  burgerIsOpen: isBurgerOpen(),
})

export default connect(mapStateToProps, null)(Logo)
