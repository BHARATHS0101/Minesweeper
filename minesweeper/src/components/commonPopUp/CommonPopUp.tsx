import React from 'react';

import './CommonPopUp.css';


const CommonPopUp:React.FC<AppNS.ICommonPopUpProps> = (props) => {

    return (
        <div className={"card"}>
            <div className={"heading"}>{props.heading}</div>
            {props.children}
        </div>
    )
};

export default CommonPopUp;
