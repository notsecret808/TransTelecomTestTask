import React, {useState} from 'react';
import './AppStyle.css'
import Header from "./Header/Header";
import Modal from "./Modal";
import Dashboard from "./Dashboard/Dashboard";
import 'semantic-ui-css/semantic.min.css'

function App() {
    const [modal, setModal] = useState({
        isHidden: true,
        payload: ''
    });
    const [auth, setAuth] = useState({
        name: '',
        isAuth: false
    });

    return (
        <div>
            <Header setModal={() => setModal({
                isHidden: false,
                payload: 'login'
            })} auth={auth} setAuth={setAuth}/>
            <Modal
                hideModal={() => setModal({
                    isHidden: true,
                    payload: ''
                })}
                setModal={(isHiddenValue: boolean, payloadValue: string) => setModal({
                    isHidden: isHiddenValue,
                    payload: payloadValue
                })}
                setAuth={setAuth} modalInfo={modal}/>
            <Dashboard isAuth={auth.isAuth} setModal={() => setModal({
                isHidden: false,
                payload: 'addBook'
            })}/>
        </div>
    );

}

export default App;
