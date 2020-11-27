import React, {useState} from 'react';
import DOMAIN from "../../../DOMAIN";

interface FindSection {
    setBooks: { (): void }
    setSection: { (value: string): void },
    PagToBegin: { (): void }
}

function findBooks(query: string, type: string, setBooks: any) {
    const data = {
        query: query,
        type: type
    };

    fetch(DOMAIN + '/api/findBooks/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).then(result => {
        if (result !== undefined) {
            if (result.error !== undefined) {
                alert('nothing founded');
            } else {
                setBooks(result.data);

            }
        }
    });
}

function FindSection(props: FindSection) {
    const [findInfo, setFindInfo] = useState('');
    const [author, setAuthor] = useState(false);
    const [name, setName] = useState(true);
    return (
        <div className={'find-books-container'}>
            <input id={'find-section-client'} className={'find-books'} placeholder={'Enter information'}
                   onChange={(event) => {
                       setFindInfo(event.target.value);
                   }}/>
            <div className={'find-books-types-container'}>
                <div>
                    <input type="radio" name="find-book-author" value={'author'} checked={author} onChange={() => {
                        setAuthor(true);
                        setName(false);
                    }}/>Author
                </div>
                <div>
                    <input type="radio" name="find-book-name" value={'name'} checked={name} onChange={() => {
                        setName(true);
                        setAuthor(false);
                    }}/>Book Name
                </div>
            </div>
            <div className={'find-book-button-wrapper'}>
                <div className={'find-book-button'} onClick={() => {
                    let type: string;
                    if (author) {
                        type = 'book_author';
                    } else {
                        type = 'book_name';
                    }
                    findBooks(findInfo, type, props.setBooks);
                    props.PagToBegin()
                    props.setSection('#all-section-client');
                }}>
                    Submit
                </div>
            </div>
        </div>
    );
}

export default FindSection;
