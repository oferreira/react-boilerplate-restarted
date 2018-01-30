import React from 'react'
import PropTypes from 'prop-types'
import InjectDrupalNodes from 'drupal/hoc/InjectDrupalNodes'
import ArticleCard from '../ArticleCard'
import MainArticle from '../MainArticle'
import './styles.scss'

const mainArticleIndex = 0
const articleThumbnail = 5

const ArticlesList = ({ items }) => {
  const content = items.filter((item, ind) => ind > mainArticleIndex)
    .map((item, ind) => (
      ind !== articleThumbnail ?
        <ArticleCard
          key={`article${ind}`}
          image={item.field_image}
          title={item.title}
        />
        :
        <ArticleCard
          key={`article${ind}`}
          image={item.field_image}
          title={item.title}
          description={item.body}
          simple
        />
    ))
  return (
    <div>
      <div className="ArticlesList__First">
        <MainArticle
          image={items[0].field_image}
          title={items[0].title}
          description={items[0].body}
        />
      </div>
      <div className="ArticlesList">{content}</div>
    </div>
  )
}

ArticlesList.propTypes = {
  items: PropTypes.array,
}

export default InjectDrupalNodes(ArticlesList)
