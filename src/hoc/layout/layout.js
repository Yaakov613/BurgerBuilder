import React, { Component } from 'react'
import Aux from '../Aux/Aux'
import classes from './layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'



class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { return { showSideDrawer: !prevState.showSideDrawer } })

    }
    render() {
        return (
            <Aux>
                <Toolbar
                    auth={this.props.authenticated}
                    toggle={this.sideDrawerToggleHandler} />
                <SideDrawer
                    auth={this.props.authenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <div>Toolbar, SideBar, Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>)
    }

}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)