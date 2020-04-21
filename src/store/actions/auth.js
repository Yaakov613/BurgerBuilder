import * as actionTypes from './actionTypes'
import Axios from 'axios'


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.LOGOUT_USER
    }
}
const checkAuthTimeout = (time) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logoutUser())
        }, time * 1000)
    }

}


export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }


        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhB8VapgqjZf5wRGwzVVwnKKh2kDeUOH0'
        if (isSignUp) { url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhB8VapgqjZf5wRGwzVVwnKKh2kDeUOH0' }
        console.log(url)
        Axios.post(url, authData)
            .then(res => {
                dispatch(checkAuthTimeout(res.data.expiresIn))
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                localStorage.setItem('token', res.data.idToken)
                const expirationTime = new Date(new Date().getTime() + (res.data.expiresIn * 1000))
                localStorage.setItem('expirationTime', expirationTime)
                localStorage.setItem('userId', res.data.localId)
            }).catch((error) => {
                dispatch(authFail(error.response.data.error.message))
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        const expirationTime = new Date(localStorage.getItem('expirationTime'))
        if (!token) { }
        if (new Date() > expirationTime) { dispatch(logoutUser()) }
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token,userId))
        dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000))
    }
}