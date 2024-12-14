import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white flex items-center justify-end p-4">
      <div className="flex items-center space-x-6">
        <button className="p-2">
          <FontAwesomeIcon icon={faBell} size="2xl" />
        </button>
        <button className="p-2">
          <FontAwesomeIcon icon={faEnvelope} size="2xl" />
        </button>
        <button className="p-2">
          <FontAwesomeIcon icon={faUserCircle} size="2xl" />
        </button>
      </div>
    </header>
  );
};

export default Header;