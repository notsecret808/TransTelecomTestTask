import React, {useEffect, useState} from "react";
import DOMAIN from "../../DOMAIN";
import SidebarItem from "./SidebarItem";
import AddBook from "./AddBook";

function Sections(props: any) {
    const [sections, setSections] = useState();
    useEffect(() => {
        fetch(DOMAIN + '/api/getSections', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        }).then((response) => {
            return response.json();
        }).then((result) => {
            let sections: string[] = [];
            for (let i = 0; i < result.data.length; i++) {
                sections[i] = result.data[i].section_name;
            }
            setSections(sections)
        })
    }, []);
    if (sections == undefined) {
        return (
            <div id={'sidebar'}>
            </div>
        );
    } else {
        const sidebarItems = sections.map((item: string, index: number) => {
            if (index == 0) return (<SidebarItem section={item} key={index} first={true}/>);
            else return (<SidebarItem section={item} key={index}/>);
        });
        return (
            <div id={'sidebar'}>
                {sidebarItems}
                <AddBook isAuth={props.isAuth} setModal = {props.setModal}/>
            </div>
        );

    }
}

export default Sections;
