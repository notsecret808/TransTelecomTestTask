import React, {useState} from "react";
import Sections from './Sections/Sections';
import WorkSpace from "./WorkSpace/WorkSpace";
import './style.css';

interface Dashboard {
    isAuth: boolean,
    setModal: { (isHidden: boolean, type: string, payload: string): void }
}

function Dashboard(props: Dashboard) {
    const [books, setBooks] = useState([]);
    const [section, setSection] = useState('all-section-client');
    return (
        <div id={'dashboard'}>
            <Sections isAuth={props.isAuth}
                      setBooks={setBooks}
                      setSection = {setSection}
                      setModal={(isHidden: boolean, type: string, payload: string) => props.setModal(isHidden, type, payload)}/>
            <WorkSpace books={books}
                       targetSection = {section}
                       isAuth={props.isAuth}
                       setModal={(isHidden: boolean, type: string, payload: string) => props.setModal(isHidden, type, payload)}/>
        </div>
    );
}

export default Dashboard;
