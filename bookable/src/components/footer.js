import React from "react";
import { Link } from "react-router-dom";
import './signup.css';

const Footer = () => (
  <div className="footer">
    <p style={{ textAlign: "center" }}>
      © {new Date().getFullYear()} Veersa Technology. All rights reserved.{" "}
      <Link to="https://www.veersatech.com" target="_blank" rel="noopener noreferrer">
        Visit our website
      </Link>
    </p>
  </div>
);

export default Footer;
