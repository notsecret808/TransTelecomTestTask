import React, {useEffect} from 'react';
import SignUp from "./Header/SignUp";
import Login from "./Header/Login";
import auth from "./types/auth";
import modalPayload from "./types/modalPayload";
import ModalAddBook from "./Dashboard/AddBook/ModalAddBook";
import ModalCard from "./Dashboard/WorkSpace/ModalCard";
import ModalEditBook from "./Dashboard/EditBook/ModalEditBook";


interface Modal {
    hideModal: { (): void },
    setAuth: { (auth: auth): void },
    modalInfo: modalPayload,
    setModal: { (value1: boolean, value2: string, value3: any): void },
}

function Modal(props: Modal) {
    let targetClass: string = '';
    if (props.modalInfo.isHidden) {
        targetClass = 'hidden';
        document.body.style.overflow = '';
    }
    else {
        document.body.style.overflow = 'hidden';
    }

    if (props.modalInfo.type === 'signup') {
        return (
            <div className={'bg-modal ' + targetClass} hidden={props.modalInfo.isHidden}>
                <div className={'modal'}>
                    <div className={'modal-wrapper'}>
                        <div className={'modal-header'}>
                            <div onClick={() => props.hideModal()} className="modal-checkbox-item">X</div>
                        </div>
                        <SignUp setType={(type: string) => props.setModal(false, type, '')}
                                hideModal={() => props.hideModal()} setAuth={props.setAuth}/>
                    </div>
                </div>

            </div>
        );
    }

    if (props.modalInfo.type === 'login') {
        return (
            <div className={'bg-modal ' + targetClass} hidden={props.modalInfo.isHidden}>
                <div className={'modal'}>
                    <div className={'modal-wrapper'}>
                        <div className={'modal-header'}>
                            <div onClick={() => props.hideModal()} className="modal-checkbox-item">X</div>
                        </div>
                        <Login setType={(type: string) => props.setModal(false, type, '')}
                               hideModal={() => props.hideModal()}
                               setAuth={props.setAuth}/>
                    </div>
                </div>

            </div>
        );
    }

    if (props.modalInfo.type === "addBook") {
        return (
            <div className={'bg-modal ' + targetClass} hidden={props.modalInfo.isHidden}>
                <div className={'modal'}>
                    <div className={'modal-wrapper'}>
                        <div className={'modal-header'}>
                            <div onClick={() => props.hideModal()} className="modal-checkbox-item">X</div>
                        </div>
                        <ModalAddBook hide={() => props.hideModal()} sections={props.modalInfo.payload}/>
                    </div>
                </div>

            </div>
        );
    }

    if (props.modalInfo.type === "Card") {
        return (
            <div className={'bg-modal ' + targetClass} hidden={props.modalInfo.isHidden}>
                <div className={'modal'}>
                    <div className={'modal-wrapper'}>
                        <div className={'modal-header'}>
                            <div onClick={() => props.hideModal()} className="modal-checkbox-item">X</div>
                        </div>
                        <ModalCard hide={() => props.hideModal()}
                                   book={props.modalInfo.payload}
                                   setModal={(isHidden: boolean, type: string, payload: any) => props.setModal(isHidden, type, payload)}
                        />
                    </div>
                </div>

            </div>
        )
            ;
    }

    if (props.modalInfo.type === "editBook") {
        return (
            <div className={'bg-modal ' + targetClass} hidden={props.modalInfo.isHidden}>
                <div className={'modal'}>
                    <div className={'modal-wrapper'}>
                        <div className={'modal-header'}>
                            <div onClick={() => props.hideModal()} className="modal-checkbox-item">X</div>
                        </div>
                            <ModalEditBook hide={() => props.hideModal()} book={props.modalInfo.payload}
                                           sections={props.modalInfo.payload.sections}/>
                    </div>
                </div>

            </div>
        );
    }

    return (<div></div>);
}

export default Modal;
