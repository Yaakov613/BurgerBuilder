import React, { Component } from 'react'
import Input from '../../components/UI/Input/input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/spinner'
import { Redirect } from 'react-router-dom'
import { updateObject } from '../../shared/utility'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'e-mail address'
                },
                value: '',
                validation: {
                    required: true,

                    minLength: 5,
                    maxLength: 20,
                    stillBusy: false,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    stillBusy: false,
                },
                valid: false,
                touched: false,
            }

        },
        isSignUp: true
    }

    componentDidMount() {
        if (!this.props.isBuilding && this.props.authRedirectPath !== '/') {
            this.props.setAuthRedirectPath()
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.included) {
            isValid = value.toLowerCase().includes(rules.included) && isValid
        }


        return isValid
    }

    inputChangedHandler = (event, controlName) => {

        const updatedControlsProps = updateObject(this.state.controls[controlName], {
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true
        })
        const updatedControls = updateObject(this.state.controls, { [controlName]: updatedControlsProps })


        this.setState({ controls: updatedControls })
    }
    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuthenticate(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }
    render() {
        const formElementArray = []
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementArray.map(formElement => {
            return <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                touched={formElement.config.touched}
                invalid={!formElement.config.valid}
                label={formElement.id}
            />
        })
        if (this.props.loading) {
            form = <Spinner />
        }
        let error = null
        if (this.props.error) {
            error = <p style={{ color: 'red' }}>{this.props.error}</p>
        }
        let authRedirect = null
        if (this.props.isAuth) { authRedirect = <Redirect to={this.props.authRedirectPath} /> }


        return (<div className={classes.Auth}>
            {authRedirect}
            <form onSubmit={this.submitHandler}>
                {error}
                {form}
                <Button btnType='Success'>SUBMIT</Button>

            </form>
            <Button
                clicked={this.switchAuthModeHandler}
                btnType='Danger'>SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        isBuilding: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticate: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)