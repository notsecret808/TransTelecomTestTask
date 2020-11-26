import React from 'react';
import DOMAIN from "../../../DOMAIN";

interface AllSection {
    setBooks: { (): void }
    setSection: { (value: string): void }
}

function getBooks(setBooks: any) {

    fetch(DOMAIN + '/api/getAllBooks', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
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

function AllSection(props: AllSection) {

    return (
        <div id={'all-section-client'}
             className="sidebar-item" onClick={() => {
            getBooks(props.setBooks);
            props.setSection('#all-section-client');
        }}>ALL</div>
    )
}

export default AllSection;
