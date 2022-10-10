import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {

    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        
        onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    return (
        <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        button="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <input ref={avatarRef} autoComplete="off" type="url" name="avatar" id="edit-avatar-input-url" className="popup__input popup__input_type_edit-avatar-url" placeholder="Ссылка на картинку" defaultValue="" required />
        <span className="edit-avatar-input-url-error popup__input-error"></span>
      </PopupWithForm>
    )
}

export default EditAvatarPopup;