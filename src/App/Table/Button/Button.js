import React from 'react';
import './Button.css';

const Button = ({className, handler}) => {
    return (
        <button className={`button ${className}`} type="button" onClick={handler}></button>
    )
}

export default Button;