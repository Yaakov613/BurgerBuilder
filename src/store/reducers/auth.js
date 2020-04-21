import * as actionTypes from '../actions/actionTypes'
import { updateObject } from './../../shared/utility'

const intitialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true })
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}
const authSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        userId: action.userId,
        token: action.idToken
    })

}
const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })

}

const logoutUser = (state, action) => {
    return updateObject(state, { token: null, userId: null })
}

const authReducer = (state = intitialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.LOGOUT_USER: return logoutUser(state, action)
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
        default:
            return state
    }

}
export default authReducer