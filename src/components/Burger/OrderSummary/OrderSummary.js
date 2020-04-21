import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    //this could alos be a functional component, doesnt have to be a class

    render() {

        const ingredientSummary = this.props.ingredients
        const list = Object.keys(ingredientSummary).map(
            (igKey) => (<li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
                {ingredientSummary[igKey]}</li>))
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {list}

                </ul>
                <h4>Total Price: ${this.props.total.toFixed(2)}</h4>
                <p>Continue to checkout?</p>
                <Button clicked={this.props.cancel} btnType={'Danger'}>CANCEL</Button>
                <Button clicked={this.props.continue} btnType={'Success'}>CONTINUE</Button>

            </Aux>
        )
    }
}

export default OrderSummary