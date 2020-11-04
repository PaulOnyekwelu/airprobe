import React from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import NavItem from "./NavItem";
import { connect } from "react-redux";

const Nav = ({ showMenu, toggleMenu, isLoggedIn }) => {
	return (
		<IconContext.Provider value={{ size: "1rem", color: "rgb(38,47,113)" }}>
			<nav
				id={`${showMenu && "showMenu"}`}
				className="nav"
				onClick={() => toggleMenu(!showMenu)}
			>
				<NavItem title="Home" link="" />
				{isLoggedIn ? (
					<>
						<NavItem title="Map" link="map" />
						<NavItem title="Logout" link="logout" />
					</>
				) : (
					<>
						<NavItem title="Login" link="login" />
						<NavItem title="Register" link="register" />
					</>
				)}
			</nav>
		</IconContext.Provider>
	);
};

Nav.propTypes = {
	showMenu: PropTypes.bool.isRequired,
	toggleMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(Nav);
