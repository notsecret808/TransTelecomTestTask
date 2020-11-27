import React, {useEffect, useState} from "react";
import MiniCard from "./MiniCard";

function WorkSpace(props: any) {
    const [hidePag, setHidePag] = useState('hide');
    let books = props.books.map((book: any, index: number) => {
        const keyIndex = index + 1;
        const client_id = 'book' + keyIndex;
        let data = book;
        data.sections = props.sections;
        data.client_id = client_id;
        return <MiniCard targetSection={props.targetSection} key={index + 1}
                         setModal={props.setModal}
                         isAuth={props.isAuth} book={data}/>
    })

    useEffect(() => {
        if (booksLen != 0) {
            setHidePag('');
        }
    },)

    let currentBooks = [];
    let isEnd = false;
    let booksLen: number = books.length;
    let hide1: string = '';
    let hide2: string = '';
    if (booksLen != 0) {
        for (let i = 0; i < 8; i++) {
            let index = i + 8 * props.count.counter;
            if (index >= booksLen) {
                isEnd = true;
                break;
            }
            currentBooks[i] = books[index];
        }
        if (props.count.counter == 0) {
            hide1 = 'hide';
        }

        if (isEnd) {
            hide2 = 'hide';
        }
    }

    return (
        <div id={'workspace'}>
            <div id={'workspace-container'}>
                {currentBooks}
            </div>
            <div className={"pagination " + hidePag}>
                <p onClick={() => props.count.setCounter(props.count.counter - 1)} className={hide1}>BACK</p>
                <p onClick={() => props.count.setCounter(props.count.counter + 1)} className={hide2}>FORWARD</p>
            </div>
        </div>
    )
}

export default WorkSpace;
