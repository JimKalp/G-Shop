import React from 'react';
import '../App.css';

function Footer() {
  return (
    <div className="main-footer">
        <div>
          <p>
            &copy;{new Date().getFullYear()} G-Shop | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
    </div>
  );
}

export default Footer;