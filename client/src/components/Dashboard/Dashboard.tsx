import React from "react";
import Sections from './Sections';
import WorkSpace from "./WorkSpace";
import './style.css';

interface Dashboard {
    isAuth: boolean,
    setModal: { (isHidden: boolean, type: string, payload: string): void }
}

function Dashboard(props: Dashboard) {
    return (
        <div id={'dashboard'}>
            <Sections isAuth={props.isAuth}
                      setModal={(isHidden: boolean, type: string, payload: string) => props.setModal(isHidden, type, payload)}/>
            <WorkSpace/>
        </div>
    );
}

export default Dashboard;
