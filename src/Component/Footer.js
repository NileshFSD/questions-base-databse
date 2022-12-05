import React from "react";
// import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="foot-box">
          <h2>AskAny</h2>
          <div>
            <h5>Address</h5>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
          </div>
        </div>
        <div className="foot-box">
          <ul className="foot-li">
            <li>About</li>
            <li>Career</li>
            <li>Docs</li>
          </ul>
        </div>
        <div className="foot-box">
          <ul className="foot-li">
            <li>Terms & condition</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
