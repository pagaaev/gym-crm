import React from 'react';
import './Header.css';
import logo from './assets/images/logo.png'


const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} alt="Academy of Gymnastics Logo" />
            </div> 
            <h1>CRM "МСК Academy of gymnastics"</h1>
        </div>
    );
};

export default Header;
