import React, { Component } from "react";
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from "react-redux";
import * as orderActions from '../../store/actions/index'


class Orders extends Component {

    componentDidMount() {
       this.props.fetchOrders(this.props.authToken,this.props.userId)
    }

    render() {
        return (
            <div>
                {this.props.orders.map(order => {

                    return <Order
                        ingredients={order.ingredients}
                        price={order.price} key={order.id} />
                })}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        orders:state.order.orders,
        authToken:state.auth.token,
        userId:state.auth.userId,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        fetchOrders:(token,userId)=>dispatch(orderActions.getOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios))