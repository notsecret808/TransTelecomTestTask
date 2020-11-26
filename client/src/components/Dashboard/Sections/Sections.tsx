import React, {useEffect, useState} from "react";
import DOMAIN from "../../../DOMAIN";
import SidebarItem from "./SidebarItem";
import AddBook from "../AddBook/AddBook";
import AllSection from "./AllSection";

function Sections(props: any) {
    const [sections, setSections] = useState();
    const [client_id, setClientId] = useState();
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
            const client_id: string[] = [];
            for (let i = 0; i < result.data.length; i++) {
                const key = `f${(~~(Math.random() * 1e8)).toString(16)}`;
                sections[i] = result.data[i].section_name;
                client_id[i] = key;
            }
            setSections(sections);
            setClientId(client_id);
            // @ts-ignore
            document.querySelector("#all-section-client").click()
        })
    }, []);
    if (sections == undefined || client_id == undefined) {
        return (
            <div id={'sidebar'}>
                <div className={'section-loading-wrapper'}>
                    <div className="section-loading">Loading</div>
                </div>
            </div>
        );
    } else {
        const sidebarItems = sections.map((item: string, index: number) => {
            if (index == 0) return (
                <SidebarItem setSection={props.setSection} id={client_id[index]} setBooks={props.setBooks}
                             section={item}
                             key={client_id[index]}
                             first={true}/>);
            else return (
                <SidebarItem setSection={props.setSection} id={client_id[index]} setBooks={props.setBooks}
                             section={item}
                             key={client_id[index]}/>);
        });
        return (
            <div id={'sidebar'}>
                {sidebarItems}
                <AllSection setSection={props.setSection}
                            setBooks={props.setBooks}/>
                <AddBook isAuth={props.isAuth}
                         sections={sections}
                         setModal={(isHidden: boolean, type: string, payload: string) => props.setModal(isHidden, type, payload)}/>
            </div>
        );

    }
}

export default Sections;
