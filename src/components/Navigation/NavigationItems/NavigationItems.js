import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {

    const changeActive = () => {

    }
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" >Burger Builder</NavigationItem>
            {props.authenticated
                ? <NavigationItem clicked={changeActive} link="/orders">Orders</NavigationItem>
                : null}
            {!props.authenticated
                ? <NavigationItem link="/auth" >Authenticate</NavigationItem>
                : <NavigationItem link='/logout'>logout</NavigationItem>}

        </ul>
    )
}

export default navigationItems