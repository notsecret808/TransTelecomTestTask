import React, {useEffect, useState} from 'react';
import DOMAIN from "../../../DOMAIN";

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

function sendData(bookName: string, bookAuthor: string, bookDescription: string, bookCover: any,
                  bookPublished: string, sectionName: string, isOpen: boolean, hide: any) {
    if (!isOpen) return;
    let formData = new FormData();
    const email: string | null = sessionStorage.getItem('email');
    formData.append('bookName', bookName);
    formData.append('bookAuthor', bookAuthor);
    formData.append('bookAuthor', bookAuthor);
    formData.append('bookDescription', bookDescription);
    formData.append('bookCover', bookCover);
    formData.append('bookPublished', bookPublished);
    formData.append('sectionName', sectionName);
    // @ts-ignore
    formData.append('email', email);

    // @ts-ignore
    fetch(DOMAIN + '/api/addBook/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData
    }).then(response => {
        if (!response.ok) {
            alert('Problems with server')
        } else {
            // @ts-ignore
            document.querySelector("#all-section-client").click();
            hide();
        }
    });
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
        file: null,
        isRight: false,
        isRightClass: 'file-not-uploaded',
        title: 'Image not uploaded'

    });
    const [bookPublished, setBookPublished] = useState(defaultData);
    const [sectionName, setSectionName] = useState(defaultData);
    let arr = props.sections.map((value: string, index: number) => {
        return <option key={index}>{value}</option>
    })
    let sectionsNameOnly = props.sections.map((value: string) => {
        return {value}
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
                    if (event.target.value.length == 0 || event.target.value.length > 150
                    ) {
                        setBookName({
                            value: event.target.value,
                            isRight: false,
                            isRightClass: 'wrong'
                        })
                    }
                }
                } className={"add-book-input-field " + bookName.isRightClass} placeholder="Book name"/>
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
                <h4 className={"add-book-file-upload-title " + bookCover.isRightClass}>{bookCover.title}</h4>
                {/*<label className={"add-book-input-label" + +bookCover.isRightClass} htmlFor="img">Select image:</label>*/}
                <div className={"add-book-file-upload-field"}>
                    <input placeholder="Book cover"
                           className="add-book-file-uploading"
                           type="file"
                           id="add-book-img"
                           accept="image/*" onChange={(event) => {
                        let file_size = check_file_size(event);
                        if (file_size <= 500 && file_size > 0) {
                            // @ts-ignore
                            setBookCover({
                                value: file_size,
                                isRight: true,
                                // @ts-ignore
                                file: event.target.files[0],
                                isRightClass: 'file-uploaded',
                                title: 'Image uploaded'
                            });
                        } else {
                            setBookCover({
                                value: file_size,
                                isRight: false,
                                file: null,
                                isRightClass: 'file-not-uploaded',
                                title: 'Image too big'
                            });
                        }
                    }}/>
                </div>
            </div>
            <div className={'add-book-inputs'}>
                <input onChange={(event) => {
                    setBookPublished({
                        value: event.target.value,
                        isRight: true,
                        isRightClass: ''
                    })
                    if (event.target.value.length > 4 || !Number.isInteger(Number(event.target.value))
                        || Number(event.target.value) < 0) {
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
                    if (event.target.value.length == 0 || event.target.value.length > 150
                        || sectionsNameOnly.find((item: any) => {
                            if (item.value == event.target.value) return true;
                        }) == undefined) {
                        setSectionName({
                            value: event.target.value,
                            isRight: false,
                            isRightClass: 'wrong'
                        })
                    }
                }} className={"add-book-input-field " + sectionName.isRightClass} placeholder="Section name"
                       list={'add-book-sections'}/>
                <datalist id="add-book-sections">
                    {arr}
                </datalist>
            </div>
            <div className="add-book-button-wrapper">
                <div className={targetClass}
                     onClick={() => sendData(bookName.value, bookAuthor.value,
                         bookDescription.value, bookCover.file, bookPublished.value, sectionName.value, buttonOpen, props.hide)}>
                    Отправить
                </div>
            </div>
        </div>);
}

export default ModalAddBook;
