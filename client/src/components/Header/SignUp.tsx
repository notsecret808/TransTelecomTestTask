import React, {useState} from 'react';
import DOMAIN from "../../DOMAIN";
import auth from "../types/auth";

interface SignUp {
    setType: { (type: string): void },
    hideModal: { (): void },
    setAuth: { (username: auth): void }
}

interface userData {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

function signupUser(data: userData, setAlertMsg: any, hideModal: any, funcs: { (value: string): void }[],
                    setAuth: { (auth: auth): void }) {
    fetch(DOMAIN + '/api/auth/signup', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            setAlertMsg('');
            for (let func of funcs) {
                func('');
            }
            hideModal();
            setAuth({
                name: data.name,
                isAuth: true
            });
            sessionStorage.setItem('name', data.name);
            sessionStorage.setItem('email', data.email);
        }
        console.log(response);
        if (!response.ok) {
            setAlertMsg('Check your credentials')
        }
        return response.json();
    });
}

function SignUp(props: SignUp) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [isOk, setIsOk] = useState('');
    return (
        <div>
            <div className={'inputs'}>
                <div className="alert-msg-wrapper">
                    <p className={'alert-msg'}>{alertMsg}</p>
                </div>
                <form action="">
                    <input onChange={(event) => {
                        setName(event.target.value);
                    }} className="input-field" type="email" placeholder="Name" value={name}/>
                    <input onChange={(event) => {
                        setEmail(event.target.value);
                    }} className="input-field" type="email" placeholder="E-Mail" value={email}/>
                    <input onChange={(event) => {
                        setPassword(event.target.value);
                    }} className="input-field" type="password" placeholder="Password" value={password}/>
                    <input onChange={(event) => {
                        setPasswordConfirm(event.target.value);
                    }} className="input-field" type="password" placeholder="Confirm password"
                           value={passwordConfirm}/>
                </form>

            </div>
            <div className={'button-wrapper'}>
                <div className="button" onClick={() => {
                    let data: userData = {
                        name: name,
                        email: email,
                        password: password,
                        password_confirmation: passwordConfirm
                    };
                    let funcs: { (value: string): void }[] = [setName, setEmail, setPassword, setPasswordConfirm]
                    signupUser(data, setAlertMsg, props.hideModal, funcs, props.setAuth);
                }}>Submit
                </div>
            </div>
            <p className={'modal-link'} onClick={() => {
                props.setType('login');
            }}>LOGIN</p>
            <div className={'modal-checkbox-wrapper'}>
                {/*<div className={'modal-checkbox'}>*/}
                {/*    Remember me? <input onClick={() => setRememberMe(!rememberMe)} type="checkbox"/>*/}
                {/*</div>*/}
            </div>
        </div>);
}

export default SignUp;
