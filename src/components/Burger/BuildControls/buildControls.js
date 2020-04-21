import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/buildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }]

const buildControls = (props) => {


    return (<div className={classes.BuildControls} >
        <p style={{
            backgroundColor: 'orange',

        }}>Current Price: $<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((button) => {
            return <BuildControl
                disabled={props.disabled[button.type]}
                add={() => props.ingredientAdded(button.type)}
                remove={() => props.ingredientRemoved(button.type)}
                key={button.label}
                label={button.label}
            />
        })}
        <button disabled={!props.purchasable} onClick={props.checkout} className={classes.OrderButton}>{props.authenticated ? 'PLace Order' : 'signup'}</button>
    </div>)
}


export default buildControls