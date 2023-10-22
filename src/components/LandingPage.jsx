import React from 'react';
import ReactPlayer from 'react-player';
import '../styles/landingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
  
      <ReactPlayer
        className="video-background"
        url="/assets/videos/beer.mp4"
        playing
        loop
        muted
      />
      <div className="video-wrapper">
        <div className="content">
          <h1>Welcome To Your Pub Crawl Planner</h1>
          <p>Explore the wide world of breweries, create your dream pub crawl, and add your own hidden gems.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;