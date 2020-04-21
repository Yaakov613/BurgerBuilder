import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/spinner'
import Input from '../../../components/UI/Input/input'
import { connect } from 'react-redux'
import * as actionCreators from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import { Redirect } from 'react-router-dom'
import { updateObject } from '../../../shared/utility'

class ContactData extends Component {
    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                    minLength: 5,
                    maxLength: 20,
                    stillBusy: false,
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                    included: 'street',
                    valid: false,
                    touched: false,
                    minLength: 5,
                    maxLength: 20,
                    stillBusy: false,
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                    minLength: 5,
                    maxLength: 20,
                    stillBusy: false,
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                    minLength: 5,
                    maxLength: 20,
                    stillBusy: false,
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 20,
                    valid: false,
                    touched: false,
                    stillBusy: false,
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {
                    required: false,
                    touched: false,
                    valid: true,
                    stillBusy: false,
                }


            },

        },

        proccessOrder: false,
        disableSubmitButton: true
    }

    orderHandler = (event) => {
        if (!this.state.proccessOrder) {
            alert('please make sure to fill in all your details!')
        } else {

            event.preventDefault()

            const formData = {}
            for (let formElementIdentifier in this.state.orderForm) {
                formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
            }




            const order = {
                ingredients: this.props.ingredients,
                price: this.props.totalPrice.toFixed(2),
                orderData: formData,
                userId: this.props.userId
            }
            this.props.submitOrder(order, this.props.token)
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

    inputChangedHandler = (event, elementIdentifier) => {



        const updatedValidation = updateObject(this.state.orderForm[elementIdentifier].validation, {
            valid: this.checkValidity(event.target.value, this.state.orderForm[elementIdentifier].validation),
            touched: true,
            stillBusy: true,

        })
        const updatedFormElement = updateObject(this.state.orderForm[elementIdentifier], {
            validation: updatedValidation,
            value: event.target.value
        })
        // if (!isValid && !updatedValidation.stillBusy) { alert('please make sure you type in a valid form') }
        const updatedOrderForm = updateObject(this.state.orderForm, { [elementIdentifier]: updatedFormElement })

        // for(let validation in updatedValidation){
        // console.log(updatedValidation[validation])

        // let formIsValid = true
        // for (let inputIdentifier in updatedOrderForm) { formIsValid = updatedOrderForm[inputIdentifier].validation.valid&&formIsValid }
        // console.log(formIsValid)

        let allowProcess = []
        for (let inputIdentifier in updatedOrderForm) {
            allowProcess.push(updatedOrderForm[inputIdentifier].validation.valid)
        }
        allowProcess = !allowProcess.includes(false)

        // const proccessOrder = Object.keys(updatedOrderForm).filter((input) => {
        //     if (updatedOrderForm[input].validation) { return input }
        // })
        // const shouldProcess = proccessOrder.map((input) => {
        //     return updatedOrderForm[input].validation.valid

        // })
        // const proccess = shouldProcess.filter((validation) => validation === false)

        // const allowProcess = proccess.length === 0

        this.setState({
            orderForm: updatedOrderForm,
            proccessOrder: allowProcess,
            disableSubmitButton: !allowProcess
        })
    }


    render() {
        const formElementArray = []
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit={this.orderHandler}>
            {formElementArray.map((input) => {
                return <Input key={input.id}
                    elementType={input.config.elementType}
                    elementConfig={input.config.elementConfig}
                    value={input.config.value}
                    changed={(event) => this.inputChangedHandler(event, input.id)}
                    touched={input.config.validation.touched}
                    invalid={!input.config.validation.valid}
                    label={input.id} />
            })}

            <Button btnType={'Success'} disable={this.state.disableSubmitButton} >ORDER</Button>
        </form>)
        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                {this.props.redirect ? <Redirect to='/' /> : null}
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        redirect: state.order.redirect,
        token: state.auth.token,
        userId: state.auth.userId

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        submitOrder: (order, token) => dispatch(actionCreators.submitOrder(order, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))