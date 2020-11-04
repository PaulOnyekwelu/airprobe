import React from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import NavItem from "./NavItem";
import { connect } from "react-redux";
import { logoutUser } from "../store/reducer/user";
import { withRouter } from "react-router-dom";

const Nav = ({ showMenu, toggleMenu, isLoggedIn, logoutUser, history }) => {
	const logout = () => {
		logoutUser(history);
	};
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
						<div className="nav_items">
							<button className="nav__links" onClick={logout}>
								<span>Logout</span>
							</button>
						</div>
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
	isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Nav));
