import useForm from "../hooks/useForm";
import {Link} from 'react-router-dom';

function Register({onRegister}) {
    const {values, handleChange} = useForm({});

    function handleSubmit(e) {
        e.preventDefault();

        if (values.email && values.password) {
            onRegister(values);
        }
    }

    return (
        <div className="login">
            <h2 className="login__header">Регистрация</h2>
            <form className="login__form" onSubmit={handleSubmit}>

                <input 
                    autoComplete="off" 
                    type="email" 
                    name="email" 
                    id="register-email" 
                    className="login__input" 
                    placeholder="Email" 
                    value={values.email || ""} 
                    onChange={handleChange}
                />

                <input 
                    autoComplete="off" 
                    type="password" 
                    name="password" 
                    id="register-password" 
                    className="login__input" 
                    placeholder="Пароль"
                    value={values.password || ""} 
                    onChange={handleChange}
                />
                <button type="submit" className="login__button">Зарегистрироваться</button>
                <div className="login__comment">
                    Уже зарегистрированы?&nbsp;<Link to="/signin" className="login__link">Войти</Link>
                </div>
                
            </form>
        </div>
    )
}

export default Register;