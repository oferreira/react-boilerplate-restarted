import React from 'react'
import PropTypes from 'prop-types'
import Responsive from 'react-responsive-decorator'
import { MOBILE, TABLET, DESKTOP } from './breakpoints'


/* BREAKPOINTS
   xs: 0,     // Extra small screen / phone
   sm: 576px, // Small screen / phone
   md: 768px, // Medium screen / tablet
   lg: 992px, // Large screen / desktop
   xl: 1200px // Extra large screen / wide desktop
================================================== */

/* HOW TO
   export default withScreensize(MyComponent)
   set screenSizes as props
   =========================================== */


const withScreensize = (WrappedComponent) => {
  class Container extends React.Component {
    state = {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    }

    componentDidMount() {
      // MOBILE
      this.props.media(MOBILE, () => {
        this.setState({
          isMobile: true,
          isTablet: false,
          isDesktop: false,
        })
      })

      // TABLET
      this.props.media(TABLET, () => {
        this.setState({
          isMobile: false,
          isTablet: true,
          isDesktop: false,
        })
      })

      // Desktop
      this.props.media(DESKTOP, () => {
        this.setState({
          isMobile: false,
          isTablet: false,
          isDesktop: true,
        })
      })
    }

    render() {
      const screenSizes = {
        isMobile: this.state.isMobile,
        isTablet: this.state.isTablet,
        isDesktop: this.state.isDesktop,
      }

      return <WrappedComponent {...this.props} screenSizes={screenSizes} />
    }
  }
  Container.propTypes = {
    media: PropTypes.func,
  }
  return Responsive(Container)
}

export default withScreensize
