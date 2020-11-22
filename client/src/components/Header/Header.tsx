import React, {useState} from 'react';
import './style.css';

interface Header {
    setModal: { (): void },
    username: string,
    setUsername: { (username:string):void}
}

function Header(props:Header) {

    if (props.username == '') {
        return (
            <div id={'header'}>
                <div className={'header-button'}>
                    <p onClick={() => {props.setModal()}}>LOGIN</p>
                </div>
            </div>
        )
    }

    else {
        return (
            <div id={'header'}>
                <div className={'header-wrapper'}>
                    <div className={'header-button-greeting'}>
                        <p>hello, {props.username}</p>
                    </div>
                    <div>
                        <p onClick={() => props.setUsername('')}>logout</p>
                    </div>
                </div>
            </div>
        )
    }

}

export default Header;
