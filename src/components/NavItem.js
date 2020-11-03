import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ title, link }) => {
	return (
		<div className="nav_items">
			<Link to={`/${link}`} className="nav__links">
				<span>{title}</span>
			</Link>
		</div>
	);
};

export default NavItem;