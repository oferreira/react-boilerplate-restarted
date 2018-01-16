import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import Node from 'drupal/containers/Node'
import Footer from 'html/components/Footer'
import BurgerMenu from 'html/components/BurgerMenu'
import BurgerToggle from 'html/components/BurgerMenu/BurgerToggle'
import Header from 'html/components/Header'
import './style.scss'


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="HomePage">
        <Header>
          <BurgerToggle />
        </Header>
        <div
          style={{ maxWidth: '1280px', margin: '0 auto' }}
        >
          <h1>HomePage</h1>
          <BurgerMenu />
          <Link to="/offers">
            Go to OffersPage
          </Link>
          <Node id={22} />
        </div>
        <Footer />
      </div>
    )
  }
}

HomePage.propTypes = {}
HomePage.defaultProps = {}

const mapStateToProps = null
const mapDispatchToProps = null


const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect,
)(HomePage)
