import * as React from 'react';
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="header_profile">
        <img className="header_profile__avatar" alt="Mat Dupont's avatar" src="./headshot.jpg" />
        <div className="header_profile__name">
          Mat Dupont
          <span className="header_profile__twitter">@matldupont</span>
        </div>
      </div>
      <div className="header_title">
        Accessible Inputs by default
      </div>
    </header>
  )
};

export default Header;
