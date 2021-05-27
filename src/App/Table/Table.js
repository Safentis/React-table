import React from 'react';
import './Table.css';

// CONST
import { URL_BASE } from '../appconstants.js';

// COMPONENTS
import RowBody      from '../RowBody/RowBody';
import RowHeader    from '../RowHeader/RowHeader';

// HOC
import table        from '../HOC/table';


const Table = ({records, onEdit, onDelete, onAdd}) => {    

    const ROW_HEADER_COMPONENT = (
        <RowHeader 
            onAdd={onAdd}
        />
    );

    const ROW_BODY_COMPONENT   = (
        records.length > 0
        &&
        records
            .map(({_id: recordID, data: record}, index) => 
                <RowBody 
                    key={index} 
                    index={index} 
                    record={record}
                    recordID={recordID}
                    onEdit={onEdit} 
                    onDelete={onDelete}
                />
        )
    );

    return (
        <table className="table">
            <thead className="table__head">
                {ROW_HEADER_COMPONENT}
            </thead>
            <tbody className="table__body">
                {ROW_BODY_COMPONENT}
            </tbody>
        </table>
    )
} 

export default table(Table, URL_BASE);