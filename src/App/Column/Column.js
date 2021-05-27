import React from 'react';
import './Column.css';

const Column = ({children, className = ''}) => {
    return (
        <td className={`column ${className}`}>
            {children}
        </td>
    )
}

export default Column;