import React, {useState} from 'react';

interface AddBook {
    isAuth: boolean,
    setModal: { (isHidden: boolean, type: string, payload: string): void }
    sections: string
}

function AddBook(props: AddBook) {
    const [isHidden, setIsHidden] = useState(false);
    if (!props.isAuth || isHidden) {
        return (
            <div id={'add-book'} className="hide">
            </div>
        );
    } else {
        return (
            <div id={'add-book'} className={'sidebar-item'} onClick={() => {
                props.setModal(false, 'addBook', props.sections);
            }}>
                Add Book
            </div>
        )
    }

}

export default AddBook;
