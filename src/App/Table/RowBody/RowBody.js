import React, { useEffect, useState } from 'react';
import './RowBody.css';

// COMPONETNS
import Column from '../Column/Column';
import Input  from '../Input/Input';
import Button from '../Button/Button';

// HOC
import row    from '../../HOC/row';

const RowBody = ({index, field, record, recordID, onChange, onEdit, onDelete, onUpdate}) => {

    //* If records updates 
    //* we update state of the table
    useEffect(() => {
        onUpdate(record);
    }, [record]);


    //* Edit is variable that contains boolean value,
    //* if value false we can't to edit row entrys
    //* else we can do it
    const [edit, setEdit] = useState(false);

    //* handleEdit is handler for edit variable
    const handleEdit = () => setEdit(!edit);

    //* handleSave enable us to save changes in row
    const handleSave = async () => {
        let response;
            response = await onEdit(index, field, recordID);

        setEdit(response);
    };

    //* handleDelete deletes of the row's record
    const handleDelete = () => {
        //* if var edit true we set false value
        edit && setEdit(!edit);
        onDelete(index, recordID);
    };


    const COLUMN_DATA = (
        field 
        &&
        Object
            .entries(field)
            .map(([name, value], index) =>
                <Column key={index}>
                    <Input 
                        value={value} 
                        name={name} 
                        handler={onChange} 
                        edit={edit}
                    />
                </Column>
            )
    );

    const COLUMN_BUTTON = (
        <Column className="column-button">
            <Button 
                className={edit ? 'button-save' : 'button-edit'}
                handler={edit ? handleSave : handleEdit} 
            />
            <Button 
                className={'button-delete'}
                handler={handleDelete} 
            />
        </Column>
    );


    return (
        <tr className="row row-body">
            {COLUMN_DATA}
            {COLUMN_BUTTON}
        </tr>
    );
};

export default row(RowBody);