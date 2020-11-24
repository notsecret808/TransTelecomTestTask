import React from "react";
import Sections from './Sections';
import WorkSpace from "./WorkSpace";
import './style.css';
import AddBook from "./AddBook";

function Dashboard(props:any) {
    return(
      <div id = {'dashboard'}>
          <Sections/>
          <WorkSpace/>
          <AddBook username = {props.username}/>
      </div>
    );
}

export default Dashboard;
