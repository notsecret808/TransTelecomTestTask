import React, {useEffect, useState} from 'react';
import './style.css';
import DOMAIN from "../../DOMAIN";

interface Header {
    setModal: { (): void },
    username: string,
    setUsername: { (username:string):void}
}

function Header(props:Header) {
    const [username, setUsername] = useState('');

    if (props.username == '' || props.username == null) {
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
                        <p onClick={() => {
                            let token:string|null = localStorage.getItem('token');
                            // @ts-ignore
                            fetch(DOMAIN + '/api/auth/logout', {
                                method: 'GET',
                                mode: 'cors',
                                headers: {
                                    'Content-type': 'application/json',
                                    'X-Requested-With': 'XMLHttpRequest',
                                    'Authorization': 'Bearer ' + token
                                },
                            });
                            props.setUsername('');
                            console.log(sessionStorage.getItem('name'));
                            sessionStorage.clear();
                        }}>logout</p>
                    </div>
                </div>
            </div>
        )
    }

}

export default Header;
