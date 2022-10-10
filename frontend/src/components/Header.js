import logo from '../images/mesto.svg';
import {Route, Switch, Link} from 'react-router-dom';

function Header({email, onLogout}) {
    return (
        <header className="header">
            <img src={logo} alt="Иконка" className="header__logo" />
            {/* <div className="header__container"> */}
                <Switch>
                    <Route exact path="/signin">
                        <Link to="/signup" className="header__link">Регистрация</Link>
                    </Route>

                    <Route exact path="/signup">
                        <Link to="/signin" className="header__link">Войти</Link>
                    </Route>

                    <Route exact path="/">
                        <h2 className="header__email">{email}</h2>
                        <Link to="/signin" className="header__link header__link_type_logged" onClick={onLogout}>Выйти</Link>
                    </Route>
                </Switch>
            {/* </div> */}
        </header>
    );
}

export default Header;