import React, { useContext } from 'react';
import './Button.css'
import updateInputContext from '../contexts/onInput';

const Button = (props) => {
    let onInputChange = useContext(updateInputContext);
    let value = props.children;

    return (
        <div className={`button ${isOperator(value) ? 'operator' : ''}`} onClick={() => onInputChange(value)}>
            {value}
        </div>
    );
};

const isOperator = val => {
    return isNaN(val);
};

export default Button;