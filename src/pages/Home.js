import React from "react";
import { connect } from "react-redux";
import Login from "./Login";


const Home = ({isLoggedIn}) => {
    if(!isLoggedIn) return (<Login />)
    return (
        <div>this is homepage</div>
    )
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
})

export default connect(mapStateToProps, {})(Home);