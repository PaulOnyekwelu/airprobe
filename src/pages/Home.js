import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Login from "./Login";

const Home = ({ isLoggedIn, users }) => {
    if (!isLoggedIn) return <Login />;

	return (
		<section className="home">
			<h2>Users Table</h2>
			<div className="user-table-section">
				<table className="user-table">
					<thead className="table_head">
						<tr>
							<th>Registered on</th>
							<th>Username</th>
							<th>Login Count</th>
						</tr>
					</thead>
					<tbody className="table_body">
						{Object.values(users).map(user => {
                            const userData = user.user;
							return (
								<tr key={userData.dateTime}>
									<td>{userData.dateTime}</td>
									<td>{userData.username}</td>
									<td>{user.loginCount}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</section>
	);
};

Home.propsTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	users: PropTypes.object
}

const mapStateToProps = state => ({
	isLoggedIn: state.user.isLoggedIn,
	users: state.user.users,
});

export default connect(mapStateToProps, null)(Home);
