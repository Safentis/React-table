import React  from 'react';
import Loader from "react-loader-spinner";
import './Table.css';

// CONST
import { URL_BASE } from '../appconstants.js';

// COMPONENTS
import RowBody      from './RowBody/RowBody';
import RowHeader    from './RowHeader/RowHeader';

// HOC
import table        from '../HOC/table';


const Table = ({records, spiner, onEdit, onDelete, onAdd, onRefresh}) => {    

    const ROW_HEADER_COMPONENT = (
        <RowHeader 
            onAdd={onAdd}
            onRefresh={onRefresh}
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

    const TABLE_LOADER = (
        <tr>
            <td colSpan="6">
                <Loader
                    className="table__spiner"
                    color={'#888'}
                    type="Oval"
                    height={400}
                    width={400}
                />
            </td>
        </tr>
    )

    return (
        <table className="table">
            <thead className="table__head">
                {ROW_HEADER_COMPONENT}
            </thead>
            <tbody className="table__body">
                {
                    (spiner) 
                    ? ROW_BODY_COMPONENT
                    : TABLE_LOADER
                }
            </tbody>
        </table>
    )
} 

export default table(Table, URL_BASE);