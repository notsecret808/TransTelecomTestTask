import React from 'react';

function ModalAddBook() {
    return (
        <div>
            <div className={'add-book-inputs'}>
                <input className="add-book-input-field" placeholder="Book name"/>
                <input className="add-book-input-field" placeholder="Book author"/>
            </div>
            <div className={'add-book-inputs'}>
                <textarea className="add-book-textarea-field" placeholder="Book description"/>
            </div>
            <div className={'add-book-file-upload'}>
                <label className="add-book-input-label" htmlFor="img">Select image:</label>
                <input className="add-book-file-upload-field" placeholder="Book cover" type="file" accept="image/*"/>
            </div>
        </div>);
}

{/*<input className="add-book-input-field" placeholder="Book published"/>*/
}
{/*<input className="add-book-input-field" placeholder="Section name"/>*/
}
{/*<form action="">*/
}
{/*    /!*<label className="add-book-input-label" htmlFor="img">Select image:</label>*!/*/
}
{/*    /!*<input className="add-book-input-field" placeholder="Book cover" type="file" accept="image/*"/>*!/*/
}
{/*    <input className="add-book-input-field" placeholder="Book published"/>*/
}
{/*    <input className="add-book-input-field" placeholder="Section name"/>*/


}

export default ModalAddBook;
