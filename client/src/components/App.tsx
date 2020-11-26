import React, {useEffect, useState} from 'react';
import './AppStyle.css'
import Header from "./Header/Header";
import Modal from "./Modal";
import Dashboard from "./Dashboard/Dashboard";
import 'semantic-ui-css/semantic.min.css'

function App() {
    const [modal, setModal] = useState({
        isHidden: true,
        type: '',
        payload: ''
    });
    const [auth, setAuth] = useState({
        name: '',
        isAuth: false
    });

    useEffect(() => {
        if (sessionStorage.getItem('token') != null || sessionStorage.getItem('name')) {
            let name = sessionStorage.getItem('name');
            if (name == null) {
                name = ''
            }
            setAuth({
                name: name,
                isAuth: true
            })
        }
        // @ts-ignore
    }, [])

    return (
        <div>
            <Header setModal={() => setModal({
                isHidden: false,
                type: 'login',
                payload: ''
            })} auth={auth} setAuth={setAuth}/>
            <Modal
                hideModal={() => setModal({
                    isHidden: true,
                    type: '',
                    payload: ''
                })}
                setModal={(isHiddenValue: boolean, typeValue: string, payloadValue: any) => setModal({
                    isHidden: isHiddenValue,
                    type: typeValue,
                    payload: payloadValue
                })}
                setAuth={setAuth} modalInfo={modal}/>
            <Dashboard isAuth={auth.isAuth} setModal={(isHidden: boolean, type: string, payload: any) => setModal({
                isHidden: isHidden,
                type: type,
                payload: payload
            })}/>
        </div>
    );

}

export default App;
