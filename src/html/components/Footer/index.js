import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'


// import Socials from './Socials'
// import Hotels from './Hotels';
// import Links from './Links';
import Icon from '../Icon'

function Footer({ children, style }) {
  return (
    <div style={style} className="Footer">
      <div className="Footer__Scissors">
        <Icon name="scissors" />
      </div>
      {/* <Socials /> */}
      {/* <Links /> */}
      {/* <Hotels /> */}
      {/* {Children.toArray(children)} */}
    </div>
  )
}

Footer.propTypes = {
  children: PropTypes.element,
  style: PropTypes.object,
}

export default Footer
