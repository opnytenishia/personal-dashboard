import React, { useState, useEffect } from 'react';
import './NewsFeed.css';

function NewsFeed() {

    const apiKey = "1ba517c2df124ee8a14358d1f5616d08";
    const newsCountry = "au";
    const newsCount = 10;

    const [newsHeadlines, setNewsHeadlines] = useState([]);
    const [newsCategory, setNewsCategory] = useState("");
    const [activeMenuItem, setActiveMenuItem] = useState("");

    // Method to load news headline from Endpoint
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

    useEffect(() => {
      getNewsHeadLines();
    }, [newsCategory]);


    // To update user selected category and reload news
    const handleCategoryClick = (category) => {
      setNewsCategory(category);
      setActiveMenuItem(category);
    }
    
  return (
    <div className="container">
      <div className="menu">
        <ul>
          <li><p className={activeMenuItem === 'business' ? 'active' : ''} onClick={() => handleCategoryClick('business')}>Business</p></li>
          <li><p className={activeMenuItem === 'entertainment' ? 'active' : ''} onClick={() => handleCategoryClick('entertainment')}>Entertainment</p></li>
          <li><p className={activeMenuItem === 'general' ? 'active' : ''} onClick={() => handleCategoryClick('general')}>General</p></li>
          <li><p className={activeMenuItem === 'health' ? 'active' : ''} onClick={() => handleCategoryClick('health')}>Health</p></li>
          <li><p className={activeMenuItem === 'science' ? 'active' : ''} onClick={() => handleCategoryClick('science')}>Science</p></li>
          <li><p className={activeMenuItem === 'sports' ? 'active' : ''} onClick={() => handleCategoryClick('sports')}>Sports</p></li>
          <li><p href="" className={activeMenuItem === 'technology' ? 'active' : ''} onClick={() => handleCategoryClick('technology')}>Technology</p></li>
        </ul>
      </div>

      <div className="card-container">
        {newsHeadlines && newsHeadlines.length > 0 ? (
           newsHeadlines.map((news, index) => (
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
          ))) : (
            <p>No News Loaded!</p>
          )}
      </div>
    </div>
  );
}

export default NewsFeed;