import React from "react";
import "../App.css";

function Footer() {
  return (
    <div className="d-flex flex-column sticky-footer-wrapper min-vh-100">
      <footer className="footer">
        <p>
          &copy;{new Date().getFullYear()} G-Shop | All rights reserved | Terms
          Of Service | Privacy
        </p>
      </footer>
    </div>
  );
}

export default Footer;
