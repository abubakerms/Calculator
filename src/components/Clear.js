import React, { useContext } from 'react';
import updateInputContext from '../contexts/onInput'
import './Button.css';
import './Clear.css';

const Clear = (props) => {
    let onClear = useContext(updateInputContext);
    return (
        <div className='button clr' onClick={() => onClear('CLEAR')}>
            {props.children}
        </div>
    );
}

export default Clear;