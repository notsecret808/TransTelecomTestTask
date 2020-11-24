import React from 'react';
import SignUp from "./Header/SignUp";
import Login from "./Header/Login";
import auth from "./types/auth";
import modalPayload from "./types/modalPayload";
import ModalAddBook from "./Dashboard/ModalAddBook";


interface Modal {
    hideModal: { (): void },
    setAuth: { (auth: auth): void },
    modalInfo: modalPayload,
    setModal: { (value1: boolean, value2: string): void }
}

function Modal(props: Modal) {
    let targetClass: string = '';
    if (props.modalInfo.isHidden) {
        targetClass = 'hidden';
    }
    if (props.modalInfo.payload === 'signup') {
        return (
            <div className={'bg-modal ' + targetClass} hidden={props.modalInfo.isHidden}>
                <div className={'modal'}>
                    <div className={'modal-wrapper'}>
                        <div className={'modal-header'}>
                            <div onClick={() => props.hideModal()} className="modal-checkbox-item">X</div>
                        </div>
                        <SignUp setType={(type: string) => props.setModal(false, type)}
                                hideModal={() => props.hideModal()} setAuth={props.setAuth}/>
                    </div>
                </div>

            </div>
        );
    }

    if (props.modalInfo.payload === 'login') {
        return (
            <div className={'bg-modal ' + targetClass} hidden={props.modalInfo.isHidden}>
                <div className={'modal'}>
                    <div className={'modal-wrapper'}>
                        <div className={'modal-header'}>
                            <div onClick={() => props.hideModal()} className="modal-checkbox-item">X</div>
                        </div>
                        <Login setType={(type: string) => props.setModal(false, type)}
                               hideModal={() => props.hideModal()}
                               setAuth={props.setAuth}/>
                    </div>
                </div>

            </div>
        );
    }

    if (props.modalInfo.payload === "addBook") {
        return (
            <div className={'bg-modal ' + targetClass} hidden={props.modalInfo.isHidden}>
                <div className={'modal'}>
                    <div className={'modal-wrapper'}>
                        <div className={'modal-header'}>
                            <div onClick={() => props.hideModal()} className="modal-checkbox-item">X</div>
                        </div>
                        <ModalAddBook/>
                    </div>
                </div>

            </div>
        );
    }

    return (<div></div>);
}

export default Modal;
