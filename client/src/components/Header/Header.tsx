import React, {useState} from 'react';
import './style.css';
import DOMAIN from "../../DOMAIN";
import auth from "../types/auth";

interface Header {
    setModal: { (): void },
    auth: auth
    setAuth: { (auth: auth): void }
}

function Header(props: Header) {
    if (!props.auth.isAuth) {
        return (
            <div id={'header'}>
                <div className={'header-button'}>
                    <p onClick={() => {
                        props.setModal()
                    }}>LOGIN</p>
                </div>
            </div>
        )
    } else {
        return (
            <div id={'header'}>
                <div className={'header-wrapper'}>
                    <div className={'header-button-greeting'}>
                        <p>hello, {props.auth.name}</p>
                    </div>
                    <div>
                        <p onClick={() => {
                            let token: string | null = sessionStorage.getItem('token');
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
                            props.setAuth({
                                name: '',
                                isAuth: false
                            });
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
