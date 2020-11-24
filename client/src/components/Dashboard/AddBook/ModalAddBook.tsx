import React, {useEffect, useState} from 'react';

function formatBytes(a: number, b = 2) {
    let result = a / 1024;
    return Math.ceil(result);
}


function check_file_size(event: any) {
    let file_size = event.target.files[0].size;
    return formatBytes(file_size);
    //or if you like to have name and type
    let file_name = event.target.files[0].name;
    let file_type = event.target.files[0].type;
}


function ModalAddBook(props: any) {
    const defaultData = {
        value: '',
        isRight: false,
        isRightClass: 'wrong'
    }
    // const [targetClass, setTargetClass] = useState('add-book-button-forbidden');
    const [buttonOpen, setButtonOpen] = useState(false);
    const [bookName, setBookName] = useState(defaultData);
    const [bookAuthor, setBookAuthor] = useState(defaultData);
    const [bookDescription, setBookDescription] = useState(defaultData);
    const [bookCover, setBookCover] = useState({
        value: 0,
        isRight: false,
        isRightClass: 'wrong'

    });
    const [bookPublished, setBookPublished] = useState(defaultData);
    const [sectionName, setSectionName] = useState(defaultData);
    let arr = props.sections.map((value: string) => {
        return <option>{value}</option>
    })

    useEffect(() => {
        if (bookName.isRight && bookCover.isRight && bookAuthor.isRight &&
            bookDescription.isRight && bookPublished.isRight && sectionName.isRight) {
            setButtonOpen(true);
            // setTargetClass('');
        } else {
            setButtonOpen(false);
            // setTargetClass('add-book-button-forbidden');
        }
    }, [bookName.value, bookCover.value, bookAuthor.value, bookDescription.value, bookPublished.value, sectionName.value])
    let targetClass: string;
    if (!buttonOpen) {
        targetClass = 'add-book-button-forbidden';
    } else {
        targetClass = 'add-book-button'
    }

    return (
        <div className={'add-book-wrapper'}>
            <div className={'add-book-inputs'}>
                <input onChange={(event) => {
                    setBookName({
                        value: event.target.value,
                        isRight: true,
                        isRightClass: ''
                    })
                    if (event.target.value.length == 0 || event.target.value.length > 150) {
                        setBookName({
                            value: event.target.value,
                            isRight: false,
                            isRightClass: 'wrong'
                        })
                    }
                }} className={"add-book-input-field " + bookName.isRightClass} placeholder="Book name"/>
                <input onChange={(event) => {
                    setBookAuthor({
                        value: event.target.value,
                        isRight: true,
                        isRightClass: ''
                    })
                    if (event.target.value.length == 0 || event.target.value.length > 100) {
                        setBookAuthor({
                            value: event.target.value,
                            isRight: false,
                            isRightClass: 'wrong'
                        })
                    }
                }} className={"add-book-input-field " + bookAuthor.isRightClass} placeholder="Book author"/>
            </div>
            <div className={'add-book-inputs'}>
                <textarea onChange={(event) => {
                    setBookDescription({
                        value: event.target.value,
                        isRight: true,
                        isRightClass: ''
                    });
                    if (event.target.value.length > 2000 || event.target.value.length == 0) {
                        setBookDescription({
                            value: event.target.value,
                            isRight: false,
                            isRightClass: 'wrong'
                        })

                    }
                }} className={"add-book-textarea-field " + bookDescription.isRightClass}
                          placeholder="Book description"/>
            </div>
            <div className={'add-book-file-upload'}>
                <label className={"add-book-input-label" + +bookCover.isRightClass} htmlFor="img">Select image:</label>
                <input className={"add-book-file-upload-field"} placeholder="Book cover"
                       type="file"
                       id="add-book-img"
                       accept="image/*" onChange={(event) => {
                    let file_size = check_file_size(event);
                    if (file_size <= 500) {
                        setBookCover({
                            value: file_size,
                            isRight: true,
                            isRightClass: ''
                        });
                    } else {
                        setBookCover({
                            value: file_size,
                            isRight: false,
                            isRightClass: 'wrong'
                        });
                    }
                }}/>
            </div>
            <div className={'add-book-inputs'}>
                <input onChange={(event) => {
                    setBookPublished({
                        value: event.target.value,
                        isRight: true,
                        isRightClass: ''
                    })
                    if (bookPublished.value.length == 0 || bookPublished.value.length > 5) {
                        setBookPublished({
                            value: event.target.value,
                            isRight: false,
                            isRightClass: 'wrong'
                        })
                    }
                }} className={"add-book-input-field " + bookPublished.isRightClass}
                       placeholder="Book published (unnecessary)"/>
                <input onChange={(event) => {
                    setSectionName({
                        value: event.target.value,
                        isRight: true,
                        isRightClass: ''
                    })
                    if (bookDescription.value.length == 0 || bookDescription.value.length > 150) {
                        setSectionName({
                            value: event.target.value,
                            isRight: true,
                            isRightClass: ''
                        })
                    }
                }} className={"add-book-input-field " + sectionName.isRightClass} placeholder="Section name"
                       list={'add-book-sections'}/>
                <datalist id="add-book-sections">
                    {arr}
                </datalist>
            </div>
            <div className="add-book-button-wrapper">
                <div className={targetClass}>
                    Отправить
                </div>
            </div>
        </div>);
}

export default ModalAddBook;
