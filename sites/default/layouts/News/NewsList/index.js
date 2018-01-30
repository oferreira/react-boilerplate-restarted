import React from 'react'
import ArticlesList from './ArticlesList'
import './styles.scss'

const NewsList = () => (
  <div className="NewsList">
    <ArticlesList
      id="news"
      limit={10}
      order="ASC"
    />
  </div>
)

export default NewsList
