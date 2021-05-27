import React from 'react';
import './Input.css';

const Input = ({name, value, handler, edit = true}) => {
    return (
        <input className="input" 
            value={value} 
            name={name} 
            onChange={handler} 
            readOnly={edit ? false : true}
            placeholder={name}
        />
    )
}

export default Input;