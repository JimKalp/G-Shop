import React from "react";
import "../App.css";

function Footer() {
  return (
    <div className="footer">
      <p>
        &copy;{new Date().getFullYear()} G-Shop | All rights reserved | Terms
        Of Service | Privacy
      </p>
    </div>
  );
}

export default Footer;
