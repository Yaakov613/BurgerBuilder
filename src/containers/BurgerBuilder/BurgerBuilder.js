import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/buildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
// import { Redirect, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/actions/index'



export class BurgerBuilder extends Component {

    state = {
        // ingredients: null,
        // totalPrice: 4,
        // purchasable: false,
        wantToCheckout: false,
        loading: false
        // error: false

    }
    componentDidMount() {
        
        this.props.fetchIngredients()
        this.props.onResetTotalPrice()
    }

    continueCheckout = () => {
        this.props.history.push('/checkout')
    }

    checkoutHandler = () => {
        if (this.props.isAuth) { this.setState({ wantToCheckout: true }) }
        else {
            this.props.setAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }

    }
    cancelCheckout = () => { this.setState({ wantToCheckout: false }) }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0
        }

        let orderSummary = null
        let burger = this.props.error ? <h1>failed to fetch the ingredients</h1> : <Spinner />

        if (this.props.ingredients) {
            burger = <Aux> <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    authenticated={this.props.isAuth}
                    purchasable={this.props.purchasable}
                    checkout={this.checkoutHandler}
                    price={this.props.totalPrice}
                    disabled={disabledInfo}
                    ingredientAdded={this.props.addIngredientsHandler}
                    ingredientRemoved={this.props.removeIngredientsHandler} />
            </Aux>
            orderSummary =
                <OrderSummary
                    continue={this.continueCheckout} cancel={this.cancelCheckout}
                    ingredients={this.props.ingredients}
                    total={this.props.totalPrice} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.wantToCheckout}
                    modalClosed={this.cancelCheckout}>
                    {orderSummary}
                </Modal>

                {burger}
            </Aux>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchasable: state.burgerBuilder.purchasable,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeIngredientsHandler: (type) => dispatch(burgerBuilderActions.removeIngredient(type)),
        addIngredientsHandler: (type) => dispatch(burgerBuilderActions.addIngredient(type)),
        fetchIngredients: () => dispatch(burgerBuilderActions.setIngredients()),
        onResetTotalPrice: () => dispatch(burgerBuilderActions.resetTotalPrice()),
        setAuthRedirectPath:(path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios))