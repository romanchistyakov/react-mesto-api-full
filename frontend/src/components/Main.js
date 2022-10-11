import {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__edit-avatar" onClick={onEditAvatar}>
                    <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
                </div>
                <div className="profile__profile-info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-button" aria-label="Кнопка редактирования профиля" onClick={onEditProfile}></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" aria-label="Кнопка добавить фото" onClick={onAddPlace}></button>
            </section>

            <section className="elements">
                <ul className="elements-grid">
                    {cards.map((item) => {
                        return(
                        <Card
                            key={item._id}
                            card={item}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                        );
                    })}
                </ul>
            </section>
      </main>
    );
}

export default Main;