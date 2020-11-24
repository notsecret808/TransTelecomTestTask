import React, {useState} from 'react';
import DOMAIN from "../../DOMAIN";
import auth from "../types/auth";

interface Login {
    setType: { (type: string): void },
    hideModal: { (): void },
    setAuth: { (username: auth): void }
}

interface userData {
    email: string,
    password: string,
    remember_me: boolean
}

function loginUser(data: userData, setAlertMsg: any, hideModal: any, setEmail: any, setPassword: any,
                   setAuth: { (auth: auth): void }) {
    fetch(DOMAIN + '/api/auth/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            setAlertMsg('Check your credentials')
        } else {
            setAlertMsg('');
            setEmail('');
            setPassword('');
            hideModal();
        }
        return response.json();
    }).then(result => {
        if (result.username != undefined) {
            setAuth({
                name: result.username,
                isAuth: true
            });
            sessionStorage.setItem('name', result.username);
            sessionStorage.setItem('email', data.email);
            console.log(localStorage.getItem('name'));
            sessionStorage.setItem('token', result.access_token);
        }
    });
}


function Login(props: Login) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    return (
        <div>
            <div className={'inputs'}>
                <div className="alert-msg-wrapper">
                    <p className={'alert-msg'}>{alertMsg}</p>
                </div>
                <form action="">
                    <input onChange={(event) => {
                        setEmail(event.target.value);
                    }} className ="input-field" type="email" placeholder="E-Mail" value={email}/>
                    <input onChange={(event) => {
                        setPassword(event.target.value);
                    }} className="input-field" type="password" placeholder="Password" value={password}/>
                </form>

            </div>

            <div className={'button-wrapper'}>
                <div className="button" onClick={() => {
                    let data: userData = {
                        email: email,
                        password: password,
                        remember_me: rememberMe,
                    };
                    loginUser(data, setAlertMsg, props.hideModal, setEmail, setPassword, props.setAuth);
                }}>Submit
                </div>
            </div>
            <p className={'modal-link'} onClick={() => {
                props.setType('signup');
            }}>SIGNUP</p>
            {/*<div className={'modal-checkbox'}>*/}
            {/*    Remember me? <input onClick={() => setRememberMe(!rememberMe)} type="checkbox"/>*/}
            {/*</div>*/}
        </div>
    );
}


export default Login;
