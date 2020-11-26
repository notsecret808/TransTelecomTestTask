import React from "react";
import MiniCard from "./MiniCard";

function WorkSpace(props: any) {
    let books = props.books.map((book: any, index: number) => {
        const client_id = `f${(~~(Math.random() * 1e8)).toString(16)}`;
        let data = book;
        data.client_id = client_id;
        console.log(book);
        return <MiniCard targetSection={props.targetSection} key={client_id} setModal={props.setModal}
                         isAuth={props.isAuth} book={data}/>
    })
    return (
        <div id={'workspace'}>
            {books}
        </div>
    )
}

export default WorkSpace;
