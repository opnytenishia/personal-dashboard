import React, { useState, useEffect } from 'react';
import './NewsFeed.css';

function NewsFeed() {

    const apiKey = "1ba517c2df124ee8a14358d1f5616d08";
    const newsCountry = "au";
    const newsCount = 10;

    const [newsHeadlines, setNewsHeadlines] = useState([]);
    const [newsCategory, setNewsCategory] = useState("");
    const [activeMenuItem, setActiveMenuItem] = useState("");

    useEffect(() => {
      getNewsHeadLines();
    }, [newsCategory]);

    const getNewsHeadLines = async() => {
      const url = `https://newsapi.org/v2/top-headlines?country=${newsCountry}&category=${newsCategory}&apiKey=${apiKey}&pageSize=${newsCount}`;

      fetch(url).then(response => response.json())
      .then(json => {
        setNewsHeadlines(json.articles);
      })
      .catch(error => 
        console.error(error)
      );
    }

    const handleCategoryClick = (category) => {
      setNewsCategory(category);
      setActiveMenuItem(category);
    }
    
  return (
    <div className="container">
      <div className="menu">
        <ul>
          <li><a href="#" className={activeMenuItem === 'business' ? 'active' : ''} onClick={() => handleCategoryClick('business')}>Business</a></li>
          <li><a href="#" className={activeMenuItem === 'entertainment' ? 'active' : ''} onClick={() => handleCategoryClick('entertainment')}>Entertainment</a></li>
          <li><a href="#" className={activeMenuItem === 'general' ? 'active' : ''} onClick={() => handleCategoryClick('general')}>General</a></li>
          <li><a href="#" className={activeMenuItem === 'health' ? 'active' : ''} onClick={() => handleCategoryClick('health')}>Health</a></li>
          <li><a href="#" className={activeMenuItem === 'science' ? 'active' : ''} onClick={() => handleCategoryClick('science')}>Science</a></li>
          <li><a href="#" className={activeMenuItem === 'sports' ? 'active' : ''} onClick={() => handleCategoryClick('sports')}>Sports</a></li>
          <li><a href="#" className={activeMenuItem === 'technology' ? 'active' : ''} onClick={() => handleCategoryClick('technology')}>Technology</a></li>
        </ul>
      </div>

      <div className="card-container">
        {newsHeadlines.map((news, index) => (
          <div className="card" key={index}>
            <h4 className="headline">{news.title.split('-')[0]}</h4>
            <p className="details">
              Published: {news.publishedAt} 
              <span className="separator">|</span> 
              Author: {news.author}
              <span className="separator">|</span>
              <a href={news.url} className="details" target="_blank">Read more</a>
              </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsFeed;