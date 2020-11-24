import React, {useState} from 'react';

interface AddBook {
    isAuth: boolean,
    setModal: { (): void }
}

function AddBook(props: AddBook) {
    const [isHidden, setIsHidden] = useState(false);
    if (!props.isAuth || isHidden) {
        let targetClass = "hide";
        return (
            <div id={'add-book'} className="hide">
            </div>
        );
    } else {
        return (
            <div id = {'add-book'} className={'sidebar-item '} onClick={() => {
                props.setModal();
            }}>
                Add Book
            </div>
        )
    }

}

export default AddBook;
