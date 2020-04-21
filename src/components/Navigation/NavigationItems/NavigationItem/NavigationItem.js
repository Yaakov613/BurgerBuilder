import React from 'react'
import classes from './NavigationItem.module.css'
import { NavLink } from 'react-router-dom'

const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink onClick={props.clicked} activeClassName={classes.active} exact to={props.link}>
                {props.children}</NavLink>

        </li>
    )
}

export default navigationItem