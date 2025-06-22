// src/pages/About.tsx
import React from 'react';
import "../Styles/About.css";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About Our Bookstore</h1>
      <p>
        Welcome to the React Bookstore! We offer a platform where book lovers
        can browse, explore, and purchase books across genres.
      </p>
      <p>
        Sellers can easily upload new titles, manage listings, and reach a wide
        audience. Buyers enjoy an intuitive shopping experience with personalized
        recommendations.
      </p>
      <p>
        This platform is built with modern web technologies like React, TypeScript,
        and Firebase. Our mission is to make books accessible to everyone with ease
        and joy.
      </p>
    </div>
  );
};

export default About;
