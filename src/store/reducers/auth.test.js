import * as actionTypes from '../actions/actionTypes'
import authReducer from './auth'
import { updateObject } from '../../shared/utility'

describe('authReducer', () => {
    let initialState
    beforeEach(() => {
        initialState = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }
    })


    it('should return the initialState', () => {
        expect(authReducer(undefined, {})).toEqual(initialState)
    })
    it('should return the updated loading prop', () => {
        expect(authReducer(initialState, { type: actionTypes.AUTH_START })).toEqual(updateObject(initialState, { loading: true }))
    })
    it('should return the updated all props on success auth, expect error', () => {
        expect(authReducer(initialState, {
            type: actionTypes.AUTH_SUCCESS, idToken: 'token',
            userId: 'userId'
        })).toEqual({
            token: 'token',
            userId: 'userId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
    it('should update authredirect path', () => {
        expect(authReducer(initialState, {
            type: actionTypes.SET_AUTH_REDIRECT_PATH,
            path: 'path'
        })).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: 'path'
        })
    })

})