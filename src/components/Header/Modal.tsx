import React, {useState} from 'react';
import SignUp from "./SignUp";
import Login from './Login';

interface Modal {
    isHidden: boolean,
    hideModal: { (): void },
    setUsername: { (username: string): void }
}

function Modal(props: Modal) {
    const [type, setType] = useState('login');
    let targetClass: string = '';
    if (props.isHidden) {
        targetClass = 'hidden';
    }
    if (type === 'signup') {
        return (
            <div id={'bg-modal'} className={targetClass} hidden={props.isHidden}>
                <SignUp setType={(type: string) => setType(type)}
                        hideModal={() => props.hideModal()} setUsername={props.setUsername}/>
            </div>
        );
    }
    return (
        <div id={'bg-modal'} className={targetClass} hidden={props.isHidden}>
            <Login setType={(type: string) => setType(type)} hideModal={() => props.hideModal()}
                   setUsername={props.setUsername}/>
        </div>
    );
}

export default Modal;
