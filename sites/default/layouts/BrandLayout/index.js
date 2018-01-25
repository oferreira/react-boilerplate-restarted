import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import './styles.scss'


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>

        <div className="blockCms AboutBrandHeader">
          <h1 className="AboutBrandHeader__title">Golden Tulip</h1>
          <img src="../../assets/brands/golden-tulip.jpg" alt="Golden Tulip" />
        </div>

        <div className="blockCms AboutBrandContent">

          <div className="AboutBrandContent__blocks">

            <div className="AboutBrandContent__header">

              <h1 className="AboutBrandContent__title">
                Playtime. Anytime.<br />
                At Golden Tulip hotels
              </h1>
              <p className="AboutBrandContent__desc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit,<br /> seteur sint occaecat cupidatat non proident.
              </p>

            </div>

            <div className="AboutBrandContent__block AboutBrandContent__block--1">
              <img src="../../assets/brand/img-2.jpg" alt="The tandems" />
              <h2 className="AboutBrandContent__block__title">The tandems</h2>
              <p className="AboutBrandContent__block__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, seteur sint occaecat cupidatat non proident, sunt in culpa qui officia derunt mollit anim id est laborum. </p>
              <a className="AboutBrandContent__block__link" href="http://www.google.com" title="Hotels with tandems">Hotels with tandems</a>
            </div>

            <div className="AboutBrandContent__block AboutBrandContent__block--2">
              <img src="../../assets/brand/img-1.jpg" alt="The foodtruck" />
              <h2 className="AboutBrandContent__block__title">The foodtruck</h2>
              <p className="AboutBrandContent__block__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, seteur sint occaecat cupidatat non proident, sunt in culpa qui officia derunt mollit anim id est laborum. </p>
              <a className="AboutBrandContent__block__link" href="http://www.google.com" title="Follow the foodtruck">Follow the foodtruck</a>
            </div>

            <div className="AboutBrandContent__block AboutBrandContent__block--3">
              <img src="../../assets/brand/img-3.jpg" alt="The body care bar" />
              <h2 className="AboutBrandContent__block__title">The body care bar</h2>
              <p className="AboutBrandContent__block__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, seteur sint occaecat cupidatat non proident, sunt in culpa qui officia derunt mollit anim id est laborum. </p>
              <a className="AboutBrandContent__block__link" href="http://www.google.com" title="Hotels with body care">Hotels with body care</a>
            </div>

            <div className="AboutBrandContent__block AboutBrandContent__block--4">
              <img src="../../assets/brand/img-4.jpg" alt="The petanque" />
              <h2 className="AboutBrandContent__block__title">The petanque</h2>
              <p className="AboutBrandContent__block__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, seteur sint occaecat cupidatat non proident, sunt in culpa qui officia derunt mollit anim id est laborum. </p>
              <a className="AboutBrandContent__block__link" href="http://www.google.com" title="Hotels with petanque">Hotels with petanque</a>
            </div>

          </div>

        </div>
      </div>)
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
