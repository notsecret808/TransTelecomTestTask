import React from 'react';
import DOMAIN from "../../../DOMAIN";

interface ModalCard {
    book: {
        id: number,
        book_name: string,
        book_author: string,
        book_description: string,
        book_cover: string,
        book_published: string,
        section_name: string,
        isAuth: boolean,
        client_id: string,
        targetSection: string,
    },
    hide: {
        (): void
    },
    setModal: { (isHidden: boolean, type: string, payload: any): void }

}

function removeBook(id: number, section_id: string, hide: { (): void }) {
    const data = {
        id: id
    };
    fetch(DOMAIN + '/api/removeBook', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            alert('Problems with server')
        } else {
            return response.json()
        }
    }).then(result => {
        console.log(section_id);
        console.log('ok', document.querySelector(section_id));
        // @ts-ignore
        document.querySelector(section_id).click();
        hide();
    });
}

function hideBook(client_id: string, hide: { (): void }) {
    // @ts-ignore
    document.querySelector('#' + client_id).classList.add('hide');
    hide();
}


function ModalCard(props: ModalCard) {
    let publish: any = '';
    if (props.book.book_published === null) {
        publish = <p>Not specified</p>
    } else {
        publish = <p>{props.book.book_published}</p>
    }
    let targetClass: string = 'hide';
    if (props.book.isAuth) {
        targetClass = '';
    }
    return (
        <div className={'add-book-wrapper'}>
            <div className={'card-img-wrapper'}>
                <img src={DOMAIN + props.book.book_cover} alt=""/>
            </div>
            <div className={'card-info'}>
                <div className={'card-item'}>
                    <h3>Name</h3>
                    <p>{props.book.book_name}</p>
                </div>
                <div className={'card-item'}>
                    <h3>Author</h3>
                    <p>{props.book.book_author}</p>
                </div>
            </div>
            <div className={'card-info'}>
                <div className={'card-item'}>
                    <h3>Published</h3>
                    <p>{publish}</p>
                </div>
                <div className={'card-item'}>
                    <h3>Section</h3>
                    <p>{props.book.section_name}</p>
                </div>
            </div>
            <div className={'card-desc'}>
                <h3>Description</h3>
                <p>{props.book.book_description}</p>
            </div>
            <div className={'card-info'}>
                <div className={'card-button edit ' + targetClass} onClick={() => {
                    props.setModal(false, 'editBook', props.book);
                }}
                >
                    <p>Edit</p>
                </div>
                <div onClick={() => {
                    removeBook(props.book.id, props.book.targetSection, props.hide)
                }} className={'card-button remove ' + targetClass}>
                    <p>Remove</p>
                </div>
                <div className={'card-button hide-btn ' + targetClass} onClick={() => {
                    hideBook(props.book.client_id, props.hide)
                }}>
                    <p>Hide</p>
                </div>
            </div>

        </div>);
}

export default ModalCard;
