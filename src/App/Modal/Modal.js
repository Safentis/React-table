import React from 'react';
import ReactDOM from 'react-dom';

const modal = document.getElementById('modal');

const Modal = ({data = 'all right', code = '200', show = true}) => {

    return (
        show &&
        ReactDOM.createPortal(
            <div>
                <p>{data}</p>
                <p>{code}</p>
            </div>,
            modal
        )
    );
};

export default Modal;