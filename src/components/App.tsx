import React, {useEffect, useState} from 'react';
import './AppStyle.css'
import Header from "./Header/Header";
import Modal from "./Header/Modal";
import Dashboard from "./Dashboard/Dashboard";
import 'semantic-ui-css/semantic.min.css'

function App() {
    const [modal, setModal] = useState(false);
    const [username, setUsername] = useState('');

    return (
        <div>
            <Header setModal={() => setModal(true)} username = {username} setUsername = {setUsername}/>
            <Modal isHidden={!modal}
                   hideModal={() => setModal(false)} setUsername={(username: string) => setUsername(username)} />
           <Dashboard username = {username}/>
        </div>
    );

}

export default App;
