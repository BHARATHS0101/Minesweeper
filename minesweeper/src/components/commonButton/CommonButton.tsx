import React from 'react';

import './CommonButton.css';


const CommonButton = (props: AppNS.ICommonButtonProps) => {

    return (
        <button className={`button ${props.className}`} onClick={props.onClick}>
            {props.name}
        </button>
    )
};

export default CommonButton;
