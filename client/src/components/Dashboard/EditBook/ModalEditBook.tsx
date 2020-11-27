import React, {useEffect, useState} from 'react';
import DOMAIN from "../../../DOMAIN";

function formatBytes(a: number, b = 2) {
    let result = a / 1024;
    return Math.ceil(result);
}


function check_file_size(event: any) {
    let file_size = event.target.files[0].size;
    return formatBytes(file_size);
}

function sendData(id: string, bookName: string, bookAuthor: string, bookDescription: string, bookCover: any,
                  bookPublished: string, sectionName: string, isOpen: boolean, hide: any) {
    if (!isOpen) return;
    let formData = new FormData();
    const email: string | null = sessionStorage.getItem('email');
    formData.append('id', id);
    formData.append('bookName', bookName);
    formData.append('bookAuthor', bookAuthor);
    formData.append('bookDescription', bookDescription);
    formData.append('bookCover', bookCover);
    if (bookPublished !== '') {
        formData.append('bookPublished', bookPublished);
    }
    formData.append('sectionName', sectionName);

    // @ts-ignore
    fetch(DOMAIN + '/api/editBook/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData
    }).then(response => {
        if (!response.ok) {
            return response.json();
        } else {
            // @ts-ignore
            document.querySelector("#all-section-client").click();
            hide();
        }
    }).then(result => {
        if (result != undefined) {
            alert(result.error);
        }
    });
}

function ModalEditBook(props: any) {
    const defaultData = {
        value: '',
        isRight: false,
        isRightClass: 'wrong'
    }
    const [buttonOpen, setButtonOpen] = useState(true);
    const [bookName, setBookName] = useState({
        value: props.book.book_name,
        isRight: true,
        isRightClass: ''
    });
    const [bookAuthor, setBookAuthor] = useState({
        value: props.book.book_author,
        isRight: true,
        isRightClass: ''
    });
    const [bookDescription, setBookDescription] = useState({
        value: props.book.book_description,
        isRight: true,
        isRightClass: ''
    });
    const [bookCover, setBookCover] = useState({
        value: 0,
        file: null,
        isRight: false,
        isRightClass: 'file-not-uploaded',
        title: 'Image not uploaded'

    });
    const [bookPublished, setBookPublished] = useState({
        value: props.book.book_published,
        isRight: true,
        isRightClass: ''
    });
    const [sectionName, setSectionName] = useState({
        value: props.book.section_name,
        isRight: true,
        isRightClass: ''
    });
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
        } else {
            setButtonOpen(false);
        }
    }, [bookName.value, bookCover.value, bookAuthor.value, bookDescription.value, bookPublished.value, sectionName.value])
    let targetClass: string;
    if (!buttonOpen) {
        targetClass = 'add-book-button-forbidden';
    } else {
        targetClass = 'add-book-button'
    }

    return (
        <div className={'add-book-wrapper overflow-hidden'}>
            <h3>Edit book information</h3>
            <div className={'add-book-inputs'}>
                <input value={bookName.value} onChange={(event) => {
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
                <input value={bookAuthor.value} onChange={(event) => {
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
                    <textarea value={bookDescription.value} onChange={(event) => {
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
                <input value={bookPublished.value} onChange={(event) => {
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
                <input value={sectionName.value} onChange={(event) => {
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
                     onClick={() => sendData(props.book.id, bookName.value, bookAuthor.value,
                         bookDescription.value, bookCover.file, bookPublished.value, sectionName.value, buttonOpen, props.hide)}>
                    Отправить
                </div>
            </div>
        </div>);
}

export default ModalEditBook;
