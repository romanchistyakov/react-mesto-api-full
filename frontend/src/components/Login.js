import useForm from "../hooks/useForm";

function Login({onLogin}) {
    const {values, handleChange} = useForm({});

    function handleSubmit(e) {
        e.preventDefault();

        if(values.email && values.password) {
            onLogin(values)
        }
    }

    return (
        <div className="login">
            <h2 className="login__header">Вход</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input 
                    autoComplete="off" 
                    type="email" 
                    name="email" 
                    id="input-email" 
                    className="login__input" 
                    placeholder="Email" 
                    value={values.email || ""} 
                    onChange={handleChange}
                />
                <input 
                    autoComplete="off" 
                    type="password" 
                    name="password" 
                    id="input-password" 
                    className="login__input" 
                    placeholder="Пароль"
                    value={values.password || ""} 
                    onChange={handleChange}
                />
                <button type="submit" className="login__button">Войти</button>
            </form>
        </div>
    )
}

export default Login;