import React from 'react';
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import Nav from './Nav';
import { Logo } from '../images';


const Header = ({ toggleMenu, showMenu }) => {
    return (
        <header className="header">
            <div className="header_logoBlock">
                <Link to="/"><img className="header__logo" src={Logo} alt="logo"/></Link>
            </div>
            <IconContext.Provider value={{size:'20px', color: "rgb(38,47,113)"}}>
                <div className="header_nav">
                    <Nav showMenu={showMenu} />
                    <div className="menu__toggle" onClick={() => toggleMenu(!showMenu)}>
                        <GiHamburgerMenu size="2rem" />
                    </div>
                </div>
            </IconContext.Provider>
            
        </header>
    )
}

export default Header;