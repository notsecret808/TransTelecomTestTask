import React, {useState} from 'react';

function AddBook(props:any) {
    const [isHidden, setIsHidden] = useState(true);
    if (props.username != null) {

    }
    return(
        <div id = {'add-book'}>
            <div id = {'add-book-title'}>Add Book</div>
        </div>
    )
}

export default AddBook;
