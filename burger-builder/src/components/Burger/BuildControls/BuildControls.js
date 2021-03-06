import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const buildControls = (props) => {

    const controls = [
        {label: 'Salad', type: 'salad'}, 
        {label: 'Bacon', type: 'bacon'}, 
        {label: 'Cheese', type: 'cheese'}, 
        {label: 'Meat', type: 'meat'}
    ]

    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
           {controls.map(ctrl => {
               return <BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label}
                        added={() => props.ingredientAdded(ctrl.type)}
                        disabled={props.disabled[ctrl.type]}
                        removed={() => props.ingredientRemoved(ctrl.type)}/>
           })}
           <button disabled={!props.purchasable} className={classes.OrderButton} onClick={props.order}>ORDER NOW</button>
        </div>
    )
}

export default buildControls;