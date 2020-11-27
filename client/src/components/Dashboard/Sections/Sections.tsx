import React, {useEffect, useState} from "react";
import DOMAIN from "../../../DOMAIN";
import SidebarItem from "./SidebarItem";
import AddBook from "../AddBook/AddBook";
import AllSection from "./AllSection";
import FindSection from "./FindSection";

function Sections(props: any) {
    const [sections, setSections] = useState();
    const [client_id, setClientId] = useState();
    const [counter, setCounter] = useState(0);
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
            props.setSectionsList(sections);
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
                             PagToBegin={props.PagToBegin}
                             section={item}
                             key={client_id[index]}
                             first={true}/>);
            else return (
                <SidebarItem setSection={props.setSection} id={client_id[index]} setBooks={props.setBooks}
                             PagToBegin={props.PagToBegin}
                             section={item}
                             key={client_id[index]}/>);
        });
        const currentSection = [];
        let isEnd = false;
        let booksLen: number = sections.length;
        let hide1: string = '';
        let hide2: string = '';
        for (let i = 0; i < 5; i++) {
            let index = i + 5 * counter;
            if (index >= booksLen) {
                isEnd = true;
                break;
            }
            currentSection[i] = sidebarItems[index];
            if (counter == 0) {
                hide1 = 'hide';
            }

            if (isEnd) {
                hide2 = 'hide';
            }
        }
        return (
            <div id={'sidebar'}>
                <div className={'sidebar-wrapper'}>
                    {currentSection}
                    <AllSection setSection={props.setSection}
                                PagToBegin={props.PagToBegin}
                                setBooks={props.setBooks}/>
                    <AddBook isAuth={props.isAuth}
                             sections={sections}
                             setModal={(isHidden: boolean, type: string, payload: string) => props.setModal(isHidden, type, payload)}/>
                </div>

                <div className={'section-pagination'}>
                    <div onClick={() => setCounter(counter - 1)} className={'section-pagination-counter ' + hide1}>-
                    </div>
                    <div onClick={() => setCounter(counter + 1)} className={'section-pagination-counter ' + hide2}>+
                    </div>
                </div>
                <FindSection setSection={props.setSection}
                             PagToBegin={props.PagToBegin}
                             setBooks={props.setBooks}
                />
            </div>
        );

    }
}

export default Sections;
