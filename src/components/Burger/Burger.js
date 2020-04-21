import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css'

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map((igkey, index) => {
        return [...Array(props.ingredients[igkey])].map((__, i) => { return <BurgerIngredient key={igkey + i} type={igkey} /> })
    })
const array=transformedIngredients.filter((array)=>{return array.length})
if (!array.length){transformedIngredients=<p>please Start adding ingredients</p>}

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={'bread-top'} />
            {transformedIngredients}
            <BurgerIngredient type={'bread-bottom'} />
        </div>


    )
}

export default burger