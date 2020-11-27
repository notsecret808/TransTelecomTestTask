import React from 'react';
import DOMAIN from "../../../DOMAIN";


interface SidebarItem {
    section: string,
    first?: boolean,
    setBooks: { (): void },
    id: string,
    setSection: { (value: string): void },
    PagToBegin: { (): void }
}

function getBooks(section: string, setBooks: any) {
    const data = {
        section: section
    };

    fetch(DOMAIN + '/api/getBooksFromSections', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            alert('problems with server');
        } else {
            return response.json();
        }
    }).then(result => {
        setBooks(result.data)
    });
}

function setSection(value: string, setSection: { (value: string): void }) {
    setSection('#' + value);
}

function SidebarItem(props: SidebarItem) {

    if (props.first == true) {
        return (
            <div className="sidebar-item sidebar-first" id={props.id}
                 onClick={() => {
                     getBooks(props.section, props.setBooks);
                     setSection(props.id, props.setSection);
                     props.PagToBegin();
                 }}>{props.section}</div>
        )
    } else {
        return (
            <div className="sidebar-item" id={props.id}
                 onClick={() => {
                     getBooks(props.section, props.setBooks);
                     setSection(props.id, props.setSection);
                     props.PagToBegin();
                 }}>{props.section}</div>
        )
    }
}

export default SidebarItem;
