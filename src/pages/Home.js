import React from "react";
import { connect } from "react-redux";
import Login from "./Login";

const Home = ({ isLoggedIn, users }) => {
    if (!isLoggedIn) return <Login />;
    console.log(localStorage)

	return (
		<section className="home">
			<h2>User Table</h2>
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

const mapStateToProps = state => ({
	isLoggedIn: state.user.isLoggedIn,
	users: state.user.users,
});

export default connect(mapStateToProps, null)(Home);
