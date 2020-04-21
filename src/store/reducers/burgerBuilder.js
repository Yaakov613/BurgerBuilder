import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
}

const fetchIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        }, building: false,
        purchasable: false
    })
}



const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingType]: state.ingredients[action.ingType] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingType],
        purchasable: true,
        building: true
    }
    return updateObject(state, updatedState)
}
const removeIngredient = (state, action) => {
    const isIngs = []
    const newIngredients = {
        ...state.ingredients,
        [action.ingType]: state.ingredients[action.ingType] - 1
    }
    for (let ing in newIngredients) {
        isIngs.push(newIngredients[ing] > 0)
    }
    const updatedIng = { [action.ingType]: state.ingredients[action.ingType] - 1 }
    const updatedIngs = updateObject(state.ingredients, updatedIng)
    const updatedState = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingType],
        purchasable: isIngs.includes(true),
        building: true
    }
    return updateObject(state, updatedState)
}

const resetTotalPrice = (state, action) => {
    return updateObject(state, { totalPrice: 4 })
}

const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INGREDIENTS:
            return fetchIngredients(state, action)
        case actionTypes.ERROR_FETCHING_INGS:
            return updateObject(state, { error: true })
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action)
        case actionTypes.RESET_TOTALPRICE:
            return resetTotalPrice(state, action)
        default:
            return state

    }

}
export default burgerBuilderReducer