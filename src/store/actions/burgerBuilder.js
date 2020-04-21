import * as actionTypes from './actionTypes'
import Axios from '../../axios-orders'

export const addIngredient = (type) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingType: type
    }
}
export const removeIngredient = (type) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingType: type
    }
}
const initIngredients = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS,
        ingredients: ingredients
    }
}

const errorFetchingIngs = () => {
    return {
        type: actionTypes.ERROR_FETCHING_INGS
    }
}

export const setIngredients = () => {
    return dispatch => {
        Axios.get('/ingredients.json').then(res => {
            dispatch(initIngredients(res.data))
        }).catch(error => { dispatch(errorFetchingIngs()) })
    }

}
export const resetTotalPrice = () => {
    return {
        type: actionTypes.RESET_TOTALPRICE
    }
}
