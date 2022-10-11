import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {useContext} from 'react';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);

    return(
        <li className="element">
            <button type="button" className={`element__trash ${isOwn && 'element__trash_visible'}`} onClick={handleDeleteClick}></button>
            <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
            <h2 className="element__name">{card.name}</h2>
            <div className="element__group">
                <button type="button" className={`element__like ${isLiked && 'element__like_active'}`} onClick={handleLikeClick}></button>
                <p className="element__counter">{card.likes.length}</p>
            </div>
        </li>
    );
}

export default Card;