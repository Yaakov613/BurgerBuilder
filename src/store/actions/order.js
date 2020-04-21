import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'


// fetching the orders from the backend

const getOrder = (orderData) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        data: orderData
    }
}
const orderFailed = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
    }
}

export const getOrders = (token, userId) => {
    return dispatch => {
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axios.get('/Orders.json' + queryParams).then(res => {
            const fetchedOrders = []
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(getOrder(fetchedOrders))
        }).catch(err => {
            dispatch(orderFailed())
            console.log('failed')
        })
    }
}

// sending the data regarding the order to the database

const sendData = (order) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        order: order
    }
}
const sendDataError = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL
    }
}

export const submitOrder = (orderData, token) => {
    return dispatch => {
        dispatch({ type: actionTypes.SENDING_ORDER })
        axios.post('/Orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(sendData(orderData))
            })
            .catch(error => { dispatch(sendDataError()) })
    }
}

export const redirectStatus = () => {
    return {
        type: actionTypes.REFRESH_REDIRECT_STATUS
    }
}