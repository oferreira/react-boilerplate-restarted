import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import Node from 'drupal/containers/Node'
import Button from 'html/components/Button'
import Footer from 'html/components/Footer'
import BurgerMenu from 'html/components/BurgerMenu'
import Header from 'html/components/Header'
import LeftHeader from 'html/components/Header/LeftHeader'
import RightHeader from 'html/components/Header/RightHeader'
import './style.scss'


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="HomePage">
        <Header>
          <LeftHeader />
          <RightHeader />
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
          <div className="wrapper">
            <h1>Buttons</h1>
            <div className="buttons">
              <Button primary>
                <span>Button 1</span>
              </Button>
              <Button primary rounded>
                <span>Button 1 rounded</span>
              </Button>
              <Button primary disabled>
                <span>Button 1 disabled</span>
              </Button>
            </div>

            <div className="buttons">
              <Button secondary>
                <span>Button 2</span>
              </Button>
              <Button secondary rounded>
                <span>Button 2 rounded</span>
              </Button>
              <Button secondary disabled>
                <span>Button 2 disabled</span>
              </Button>
            </div>

            <div className="buttons">
              <Button tertiary>
                <span>Button 3</span>
              </Button>
              <Button tertiary rounded>
                <span>Button 3 rounded</span>
              </Button>
              <Button tertiary disabled>
                <span>Button 3 disabled</span>
              </Button>
            </div>
          </div>
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
