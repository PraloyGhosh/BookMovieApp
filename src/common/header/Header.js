import React from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";

const Header = () => {
    return(
        <header className="header">
            <img src={logo} alt="logo" className="logo"/>
        </header>
    );
}

export default Header;