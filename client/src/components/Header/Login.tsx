import React, {useState} from 'react';
import DOMAIN from "../../DOMAIN";

interface Login {
    setType: { (type: string): void },
    hideModal: { (): void },
    setUsername: { (username: string): void }
}

interface userData {
    email: string,
    password: string,
    remember_me: boolean
}

function loginUser(data: userData, setIsOk: any, setAlertMsg: any, hideModal: any, setEmail: any, setPassword: any,
                   setUsername: { (username: string): void }) {
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
        setUsername(result.username);
    });
}


function Login(props: Login) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [isOk, setIsOk] = useState('');
    return (
        <div className={'modal'}>
            <div className={'modal-wrapper'}>
                <div className={'modal-header'}>
                    <div onClick={() => {
                        props.hideModal();
                        setEmail('');
                        setPassword('');
                    }} className="modal-checkbox-item">X
                    </div>
                </div>
                <div className={'inputs'}>
                    <div className="alert-msg-wrapper">
                        <p className={'alert-msg'}>{alertMsg}</p>
                    </div>
                    <form action="">
                        <input onChange={(event) => {
                            setEmail(event.target.value);
                        }} className="input-field" type="email" placeholder="E-Mail" value={email}/>
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
                        loginUser(data, setIsOk, setAlertMsg, props.hideModal, setEmail, setPassword, props.setUsername);
                    }}>Submit
                    </div>
                </div>
                <p className={'modal-link'} onClick={() => {
                    props.setType('signup');
                }}>SIGNUP</p>
                <div className={'modal-checkbox'}>
                    Remember me? <input onClick={() => setRememberMe(!rememberMe)} type="checkbox"/>
                </div>
            </div>
            {/*<div className="close">+</div>*/}
        </div>);
}

export default Login;
