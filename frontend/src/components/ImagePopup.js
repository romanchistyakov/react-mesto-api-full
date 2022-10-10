function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_image ${card.name && "popup_opened"}`}>
            <div className="popup__image-container">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <img src={card.link} alt={card.name} className="popup__image-source" />
                <h2 className="popup__image-head">{card.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;