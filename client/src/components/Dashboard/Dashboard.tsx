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
    const [sectionsList, setSectionsList] = useState('all-section-client');
    const [counter, setCounter] = useState(0);
    return (
        <div id={'dashboard'}>
            <Sections isAuth={props.isAuth}
                      PagToBegin = {() => setCounter(0)}
                      setBooks={setBooks}
                      setSection={setSection}
                      setSectionsList={setSectionsList}
                      setModal={(isHidden: boolean, type: string, payload: string) => props.setModal(isHidden, type, payload)}/>
            <WorkSpace books={books}
                       targetSection={section}
                       sections = {sectionsList}
                       count={{
                           setCounter: setCounter,
                           counter: counter
                       }}
                       isAuth={props.isAuth}
                       setModal={(isHidden: boolean, type: string, payload: string) => props.setModal(isHidden, type, payload)}/>
        </div>
    )
        ;
}

export default Dashboard;
