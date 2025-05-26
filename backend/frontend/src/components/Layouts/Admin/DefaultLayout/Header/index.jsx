import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./HeaderStyle.scss";

const Header = () => {
  return (
    <header className="admin-header">
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input type="text" placeholder="Tìm kiếm..." />
      </div>

      <div className="header-right">
        <div className="notification">
          <FontAwesomeIcon icon={faBell} />
          <span className="badge">3</span>
        </div>
        <div className="message">
          <FontAwesomeIcon icon={faEnvelope} />
          <span className="badge">5</span>
        </div>
      </div>
    </header>
  );
};

export default Header;