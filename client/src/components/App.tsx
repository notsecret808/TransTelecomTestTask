import React, {useState} from 'react';
import './AppStyle.css'
import Header from "./Header/Header";
import Modal from "./Header/Modal";

function App() {
    const [modal, setModal] = useState(false);
    const [username, setUsername] = useState('');
    // const [background, setBackground] = useState('main');
    // const data = {
    //     "email": "levandro@mail.ru",
    //     "password": "123456",
    //     "remember_me": true
    // }
    // useEffect(() => {
    //     fetch(DOMAIN + '/api/auth/login', {
    //         method: 'POST',
    //         mode: 'cors',
    //         headers: {
    //             'Content-type': 'application/json',
    //             'X-Requested-With': 'XMLHttpRequest',
    //         },
    //         body: JSON.stringify(data)
    //     });
    // })

    return (
        <div>
            <Header setModal={() => setModal(true)} username = {username} setUsername = {setUsername}/>
            <Modal isHidden={!modal}
                   hideModal={() => setModal(false)} setUsername={(username: string) => setUsername(username)} />
        </div>
    );

}

export default App;
