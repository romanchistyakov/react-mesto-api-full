import {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

    const {values, handleChange, setValues} = useForm({});

    useEffect(() => {
        setValues({});
        }, [isOpen]
    ); 

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: values.name,
            link: values.link
        })
    }

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            button="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <input autoComplete="off" type="text" name="name" id="add-input-name" className="popup__input popup__input_type_add-name" placeholder="Название" required minLength="2" maxLength="30" value={values.name || ""} onChange={handleChange} />
            <span className="add-input-name-error popup__input-error"></span>
            <input autoComplete="off" type="url" name="link" id="add-input-url" className="popup__input popup__input_type_add-url" placeholder="Ссылка на картинку" required value={values.link || ""} onChange={handleChange}/>
            <span className="add-input-url-error popup__input-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;