import React, { useEffect, useState } from 'react';
import "./navbar.css"

function Navbar() {
  const [show, handleShow] = useState(false);
  useEffect (() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
      
      
    
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav__logo"
        src="./imgg/net1.png"
        alt="Nexflix Logo"
      />

      <img className="nav_avatar" src="./imgg/net2.png" alt="netflix logo" />
    </div>
  );
}

export default Navbar