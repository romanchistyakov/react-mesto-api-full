function PopupWithForm({isOpen, onClose, name, title, button, children, onSubmit, isLoading}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <h2 className="popup__head">{title}</h2>
                <form className="popup__form" name={`${name}-form`} onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="popup__button">{isLoading ? 'Сохранение...' : button}</button>
                </form>
            </div>
      </div>
    );
}

export default PopupWithForm;