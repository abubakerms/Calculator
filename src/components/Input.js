import React from 'react';
import './Input.css'

const Input = (props) => {
    return (
        <div className='input'>
            {/*Show 0 as default input if no input is passed */}
            {props.children ? props.children : '0'}
        </div>
    )
};

export default Input;