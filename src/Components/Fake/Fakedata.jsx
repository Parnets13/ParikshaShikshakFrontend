import React, { useState } from 'react';

const Fakedata = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <div className={`navbar ${isNavOpen ? 'responsive' : ''}`}>
      <div className="navbar-header">
        <span className="icon" onClick={toggleNav}>&#9776;</span>
        <a href="#home" className="logo">Your Logo</a>
      </div>
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
      </div>
    </div>
  );
};

export default Fakedata;
