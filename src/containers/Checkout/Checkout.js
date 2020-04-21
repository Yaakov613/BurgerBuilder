import React, { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actions from '../../store/actions/index'


class Checkout extends Component {

    componentDidMount(){
        this.props.refreshRedirectStatus()
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let summary = <Redirect to='/' />
        if(this.props.ingredients){
            summary=<CheckoutSummary cancel={this.checkoutCancelHandler}
                    continue={this.checkoutContinueHandler}
                    ingredients={this.props.ingredients} />
                
        }
        return (

            <div>
                {summary}
                <Route path={'/checkout/contact-data'} component={ContactData} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        refreshRedirectStatus:()=>dispatch(actions.redirectStatus())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout)