import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import Node from 'drupal/containers/Node'
import Footer from 'common/containers/Footer'

import BurgerMenu from 'common/components/BurgerMenu'
import BurgerToggle from 'common/components/BurgerMenu/BurgerToggle'
import Header from 'common/components/Header'
import SelectLanguages from 'core/language/containers/SelectLanguages'
import Translation from 'core/language/components/Translation'

import Icon from 'common/components/Icon'
import Button from 'common/components/Button'
import './style.scss'


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="HomePage">
        <Header>
          <BurgerToggle />
        </Header>

        <div>

          <Translation id="app.CityTax.taxesAndChargeIncluded" />
          <Node id={22} />
          <SelectLanguages />


          <h1 className="heading-primary-1">heading-primary-1</h1>
          <h1 className="heading-primary-2">heading-primary-2</h1>
          <h1 className="heading-primary-3">heading-primary-3</h1>


          <h1 className="heading-secondary-1">heading-secondary-1</h1>
          <h1 className="heading-secondary-2">heading-secondary-2</h1>
          <h1 className="heading-secondary-3">heading-secondary-3</h1>


          <p className="body-1">body-1</p>
          <p className="body-2">body-2</p>
          <p className="body-3">body-3</p>

          <a href="http://www.google.com" className="link">Link </a>

        </div>

        <BurgerMenu />

        <div className="WrapperPage">

          <div className="blockCms blockBrands">

            <div className="blockBrands__wrapper">

              <h1 className="blockBrands__title">
                Our brands
              </h1>
              <p className="blockBrands__intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br /> In massa augue, finibus semper sagittis malesuada</p>

              <a href="http://www.google.com" title="Brand - Royal Tulip " className="blockBrands__brand">
                <img className="blockBrands__img" src="../../assets/brands/royal-tulip.jpg" alt="Logo - Royal Tulip - luxury hotel" />
                <p className="blockBrands__txt">Midscale properties</p>
                <Button rounded small>
                  Learn more
                </Button>
              </a>

              <a href="http://www.google.com" title="Brand - Golden tulip" className="blockBrands__brand">
                <img className="blockBrands__img" src="../../assets/brands/golden-tulip.jpg" alt="Logo - Golden tulip" />
                <p className="blockBrands__txt">Midscale properties</p>
                <Button rounded small>
                  Learn more
                </Button>
              </a>

              <a href="http://www.google.com" title="Brand -Tulip Inn" className="blockBrands__brand">
                <img className="blockBrands__img" src="../../assets/brands/tulip-inn.jpg" alt="Logo - Tulip Inn" />
                <p className="blockBrands__txt">Midscale properties</p>
                <Button rounded small>
                  Learn more
                </Button>
              </a>

              <div className="resumeArticleTxtImg-1">
                <div className="resumeArticleTxtImg-1__txt">
                  <h3 className="resumeArticleTxtImg-1__title">
                    Lorem ipsum sit amet dolorem quit
                    this biret litus radiom.
                  </h3>
                  <p className="resumeArticleTxtImg-1__desc">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vita. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
                <div className="resumeArticleTxtImg-1__img">
                  <img src="https://dummyimage.com/470x350/adadad/525252" alt="" />
                </div>
              </div>

              <a href="http://www.google.com" title="View all Louvre hotel Group brands" className="blockBrands__Link">
                <span>View all Louvre hotel Group brands</span>
                <Icon name="arrow-bot" />
              </a>

              <h2 className="blockBrands__subTitle">Our hotel partner</h2>
              <p className="blockBrands__intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br /> In massa augue, finibus semper sagittis malesuada</p>

              <a href="http://www.google.com" title="Brand - Magnuson " className="blockBrands__brand">
                <img className="blockBrands__img" src="../../assets/brands/magnuson.jpg" alt="Logo - Magnuson worldwide" />
                <p className="blockBrands__txt">Americ’as fastest growing hotel brand</p>
                <Button rounded small>
                  Learn more
                </Button>
              </a>

            </div>

          </div>

          {/* Bloc history */}
          <div className="blockCms blockTimeline">
            <div className="blockTimeline__img">
              <img src="https://dummyimage.com/571x357/adadad/525252" alt="" />
            </div>
            <div className="blockTimeline__txt">
              <h2 className="blockTimeline__title">Golden Tulip<br />through the ages</h2>
              <p className="blockTimeline__intro">Golden Tulip, a prestigious heritage with an upscale positioning from the begining</p>
              <ul className="blockTimeline__lists">
                <li className="blockTimeline__list">
                  <h4 className="blockTimeline__listTitle">2015</h4>
                  <p className="blockTimeline__listDesc">Golden Tulipis owned by Jin Jiang international</p>
                </li>
                <li className="blockTimeline__list">
                  <h4 className="blockTimeline__listTitle">2015</h4>
                  <p className="blockTimeline__listDesc">Golden Tulipis owned by Jin Jiang international</p>
                </li>
                <li className="blockTimeline__list">
                  <h4 className="blockTimeline__listTitle">2015</h4>
                  <p className="blockTimeline__listDesc">Golden Tulipis owned by Jin Jiang international</p>
                </li>
                <li className="blockTimeline__list">
                  <h4 className="blockTimeline__listTitle">2015</h4>
                  <p className="blockTimeline__listDesc">Golden Tulipis owned by Jin Jiang international</p>
                </li>
                <li className="blockTimeline__list">
                  <h4 className="blockTimeline__listTitle">2015</h4>
                  <p className="blockTimeline__listDesc">Golden Tulipis owned by Jin Jiang international</p>
                </li>
                <li className="blockTimeline__list">
                  <h4 className="blockTimeline__listTitle">2015</h4>
                  <p className="blockTimeline__listDesc">Golden Tulipis owned by Jin Jiang international</p>
                </li>
                <li className="blockTimeline__list">
                  <h4 className="blockTimeline__listTitle">2015</h4>
                  <p className="blockTimeline__listDesc">Golden Tulipis owned by Jin Jiang international</p>
                </li>
              </ul>
            </div>

          </div>


          <div className="blockCms blockBrands">

            <div className="blockBrands__wrapper">

              <h1 className="blockBrands__title">
                Other brands
              </h1>
              <p className="blockBrands__intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br /> In massa augue, finibus semper sagittis malesuada</p>

              <a href="http://www.google.com" title="Brand - Royal Tulip " className="blockBrands__brand">
                <img className="blockBrands__img" src="../../assets/brands/royal-tulip.jpg" alt="Logo - Royal Tulip - luxury hotel" />
                <p className="blockBrands__txt">Midscale properties</p>
                <Button rounded small>
                  Learn more
                </Button>
              </a>

              <a href="http://www.google.com" title="Brand -Tulip Inn" className="blockBrands__brand">
                <img className="blockBrands__img" src="../../assets/brands/tulip-inn.jpg" alt="Logo - Tulip Inn" />
                <p className="blockBrands__txt">Midscale properties</p>
                <Button rounded small>
                  Learn more
                </Button>
              </a>

              <a href="http://www.google.com" title="View all Louvre hotel Group brands" className="blockBrands__Link">
                <span>View all Louvre hotel Group brands</span>
                <Icon name="arrow-bot" />
              </a>

              <h2 className="blockBrands__subTitle">Our hotel partner</h2>
              <p className="blockBrands__intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br /> In massa augue, finibus semper sagittis malesuada</p>

              <a href="http://www.google.com" title="Brand - Magnuson " className="blockBrands__brand">
                <img className="blockBrands__img" src="../../assets/brands/magnuson.jpg" alt="Logo - Magnuson worldwide" />
                <p className="blockBrands__txt">Americ’as fastest growing hotel brand</p>
                <Button rounded small>
                  Learn more
                </Button>
              </a>

            </div>

          </div>


        </div>
        <Footer menuId="footer" />
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
