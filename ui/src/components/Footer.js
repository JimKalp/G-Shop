import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <div className="fixed-bottom">
      <div className="footer">
        <p>
          &copy;{new Date().getFullYear()} G-Shop | All rights reserved 
        </p>
      </div>
    </div>
  );
}

export default Footer;
