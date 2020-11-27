import React from "react";
import DOMAIN from "../../../DOMAIN";

interface MiniCard {
    book: any
    setModal: { (isHidden: boolean, type: string, payload: string): void },
    isAuth: boolean,
    targetSection: string,
}


function MiniCard(props: MiniCard) {
    let data = props.book;
    data.isAuth = props.isAuth;
    data.targetSection = props.targetSection;
    return (
        <div className="mini-card"
             id={data.client_id}
             onClick={() => {
                 props.setModal(false, 'Card', data)
             }}
        >
            <div className="mini-card-img-wrapper">
                <img src={DOMAIN + props.book.book_cover} alt=""/>
            </div>
            <div className="mini-card-book-name-wrapper">
                <h5>Name: {props.book.book_name}</h5>
            </div>
            <div className="mini-card-book-author-wrapper">
                <h5>Author: {props.book.book_author}</h5>
            </div>
        </div>
    )
}

export default MiniCard;
