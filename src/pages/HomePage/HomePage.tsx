import React from 'react';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
        <h1>Welcome to the Bug Tracker</h1>
        <p>This is the home page of your application.</p>
  
        <a href="/report-bug">Report a Bug</a>
    </div>
  );
};

export default HomePage;
