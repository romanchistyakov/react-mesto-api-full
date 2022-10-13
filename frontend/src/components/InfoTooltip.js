import imageComplete from '../images/complete.svg';
import imageError from '../images/error.svg';

const InfoTooltip = ({onClose, isOpen, isComplete}) => {
    const textComlete = 'Вы успешно зарегистрировались!';
    const textError = 'Что-то пошло не так! Попробуйте ещё раз.'

    return (
        <div className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <img src={isComplete ? imageComplete : imageError} alt="Знак" className="popup__infotooltip-sign" />
                <h2 className="popup__infotooltip-message">{isComplete ? textComlete : textError}</h2>
            </div>
        </div>
    );
}

export default InfoTooltip;