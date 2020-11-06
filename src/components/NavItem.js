import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavItem = ({ title, link }) => {
	return (
		<div className="nav_items">
			<Link to={`/${link}`} className="nav__links">
				<span>{title}</span>
			</Link>
		</div>
	);
};

NavItem.propTypes = {
	title: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired
}

export default NavItem;