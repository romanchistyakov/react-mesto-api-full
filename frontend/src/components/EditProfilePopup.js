import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect} from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
    const currentUser = useContext(CurrentUserContext);

    const {values, handleChange, setValues} = useForm({});

    useEffect(() => {
        setValues(currentUser);
        }, [currentUser, isOpen]
    ); 

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name: values.name,
            about: values.about,
        });
    }

    return (
        <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        button="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <input autoComplete="off" type="text" name="name" id="input-name" className="popup__input" placeholder="Имя" required minLength="2" maxLength="40" value={values.name || ""} onChange={handleChange}/>
        <span className="input-name-error popup__input-error"></span>
        <input autoComplete="off" type="text" name="about" id="input-description" className="popup__input" placeholder="Занятие" required minLength="2" maxLength="200" value={values.about || ""} onChange={handleChange}/>
        <span className="input-description-error popup__input-error"></span>
      </PopupWithForm>
    );
}

export default EditProfilePopup;