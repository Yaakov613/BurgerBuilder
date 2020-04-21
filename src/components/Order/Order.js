import React from 'react'
import classes from './Order.module.css'

const order = (props) => {

    const ingredients = []
    for (let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        })
    }
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients.map((ig) => {
                return <span
                    style={{
                        textTransform: 'capitalize', border: '1px solid #ccc',
                        margin: '0 8px',
                        padding: '5px',
                        display: 'inline-block'
                    }}
                    key={ig.name}>{ig.name} ({ig.amount})</span>
            })}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default order 