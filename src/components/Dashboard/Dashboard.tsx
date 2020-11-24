import React from "react";
import Sections from './Sections';
import WorkSpace from "./WorkSpace";
import './style.css';
import AddBook from "./AddBook";

interface Dashboard {
    isAuth: boolean,
    setModal: { (): void }
}

function Dashboard(props: Dashboard) {
    return (
        <div id={'dashboard'}>
            <Sections isAuth={props.isAuth} setModal = {props.setModal}/>
            <WorkSpace/>
        </div>
    );
}

export default Dashboard;
