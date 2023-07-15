import React from "react";
import video from "../assets/video.png";
import call from "../assets/call.png";
import search from "../assets/search.png";
export default function Navbar() {
  return (
    <div className="navbar">
      <div className="info">
        <div className="info-image">
          <img
            src="https://www.iconpacks.net/icons/2/free-facebook-messenger-icon-2881-thumb.png"
            alt="logo"
          />
        </div>
        <div className="info-details">
          <h1>K-chat</h1>
          <p>Chat with your friends with ease</p>
        </div>
      </div>
      <div className="icons">
        <img src={video} alt="" />
        <img src={call} alt="" />
        <img src={search} alt="" />
      </div>
    </div>
  );
}
