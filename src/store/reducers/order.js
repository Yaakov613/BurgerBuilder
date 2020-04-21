import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './../../shared/utility'


const initialState = {
    orders: [],
    loading: false,
    redirect: false
}

const sendingOrder = (state, action) => {
    return updateObject(state, { loading: true })
}
const purchaseBurgerSuccess = (state, action) => {
    return updateObject(state, { loading: false, redirect: true })
}
const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false })
}
const refreshRedirectStatus = (state, action) => {
    return updateObject(state, { redirect: false })
}
const fetchOrders = (state, action) => {
    return updateObject(state, { orders: action.data })
}
const fetchOrdersFailed = (state, action) => {
    return updateObject(state)
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SENDING_ORDER:
            return sendingOrder(state, action)
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state, action)
        case actionTypes.REFRESH_REDIRECT_STATUS:
            return refreshRedirectStatus(state, action)
        case actionTypes.FETCH_ORDERS:
            return fetchOrders(state, action)
        case actionTypes.FETCH_ORDERS_FAILED:
            return fetchOrdersFailed(state, action)
        default:
            return state
    }
}

export default orderReducer