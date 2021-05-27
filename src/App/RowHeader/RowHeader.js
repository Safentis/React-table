import React from 'react';
import './RowHeader.css';

// COMPONENTS
import Column from '../Column/Column';
import Input  from '../Input/Input';
import Button from '../Button/Button';

// HOC
import row   from '../HOC/row';

const RowHeader = ({field, onChange, onAdd, onClear}) => {
     
    const handleAdd = () => {
        onAdd(field);
        onClear();
    }

    const COLUMN_CONTROLS = (
        Object
            .entries(field)
            .map(([name, value], index) =>
                <Column key={index}>
                    <Input 
                        value={value} 
                        name={name} 
                        handler={onChange}
                    />
                </Column>
            )
    );

    const COLUMN_BUTTON = (
        <Column className="column-button">
            <Button 
                className="button-add"
                handler={handleAdd}
            />
        </Column>
    );

    return (
        <tr className="row row-header">
            {COLUMN_CONTROLS}
            {COLUMN_BUTTON}
        </tr>
    );
};

export default row(RowHeader);