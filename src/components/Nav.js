import React from "react";
import PropTypes from 'prop-types';
import { IconContext } from "react-icons";
import NavItem from "./NavItem";

const Nav = ({ showMenu }) => {
	return (
		<IconContext.Provider value={{ size: "1rem", color: "rgb(38,47,113)" }}>
				<nav id={`${showMenu && "showMenu"}`} className="nav">
					<NavItem title="Home" link="" />
					<NavItem title="Login" link="login" />
					<NavItem title="Register" link="register" />
				</nav>
		</IconContext.Provider>
	);
};

Nav.propTypes = {
	showMenu: PropTypes.bool.isRequired
}

export default Nav;
