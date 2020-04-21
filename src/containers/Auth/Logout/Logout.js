import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../../../store/actions/index'



class Logout extends Component {

    componentDidMount() {
        this.props.logoutUser()
    }
    render() {
        return <Redirect to='/' />
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(actions.logoutUser())
    }
}
export default connect(null, mapDispatchToProps)(Logout)