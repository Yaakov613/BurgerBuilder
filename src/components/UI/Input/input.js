import React from 'react'
import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null
    const inputClasses = [classes.InputElement]
    if (props.invalid && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break
        case ('select'):
            inputElement = <select value={props.value}
                className={inputClasses.join(' ')}
                onChange={props.changed}>
                {props.elementConfig.options.map((option) => {
                    return <option value={option.value} key={option.value}>
                        {option.displayValue}
                    </option>
                })}
            </select>

            break
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
            />
    }
    let validationError = null;
if (props.invalid && props.touched) {
    validationError=`please enter a valid ${props.label}`
}

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{validationError}</label>
            
            {inputElement}
        </div>
    )
}
export default input