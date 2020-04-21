import React, { Component } from 'react';
import Layout from './hoc/layout/layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux';
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})



class App extends Component {
  componentDidMount() {
    this.props.authCheckState()
  }
  render() {
    let routes = (<Switch>
      <Route path={'/auth'} component={asyncAuth} />
      <Route path={'/'} exact component={BurgerBuilder} />
      <Redirect to={'/'} />
    </Switch>
    )
    if (this.props.isAuth) {
      routes = (<Switch>

        <Route path={'/orders'} component={asyncOrders} />
        <Route path={'/checkout'} component={asyncCheckout} />
        <Route path={'/logout'} component={Logout} />
        <Route path={'/auth'} component={asyncAuth} />
        <Route path={'/'} exact component={BurgerBuilder} />
        <Redirect to={'/'} />
      </Switch>
      )
    }
    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authCheckState: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
