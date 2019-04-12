import React from 'react';

import classes from './Logo.css';
import burgerLogo from '../../assets/26.1 burger-logo.png.png';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height, marginBottom: props.marginBottom}}>
        <img src={burgerLogo} alt="Burger Logo"></img>
    </div>
)

export default logo;