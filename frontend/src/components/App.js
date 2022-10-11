import { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/Auth';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const history = useHistory();

  function tokenCheck() {
    const token = localStorage.getItem('token');

    if (token) {
      auth.authorize(token)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setEmail(res.email);
          history.push('/');
        }
      })
      .catch(console.log)
    }
  }

  function tokenDelete() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/signin');
  }

  useEffect(() => {
    tokenCheck();
  },[]);

  function handleRegister(data) {

    auth.register(data.email, data.password)
    .then(() => {
        setIsRegistrationComplete(true)
        history.push('/signin');
    })
    .catch((err) => {
        console.log(err);
        setIsRegistrationComplete(false)
    })
    .finally(handleInfoTooltipOpen)
  }

  function handleLogin(data) {
    auth.login(data.email, data.password)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        return res;
      }
    })
    .then((res) => {
      if(res) {
        setEmail(data.email);
        setLoggedIn(true);
        history.push('/');
      }
    })
    .catch((error) => {
      console.log(error);
      handleInfoTooltipOpen();
    })
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipPopupOpen(!isInfoTooltipPopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);

    api.setUserInfo(data)
    .then(setCurrentUser)
    .then(closeAllPopups)
    .catch(console.log)
    .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);

    api.setUserAvatar(data)
    .then(setCurrentUser)
    .then(closeAllPopups)
    .catch(console.log)
    .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
      .then(setCurrentUser)
      .catch(console.log);

      api.getInitialCards()
      .then((cards) => setCards(cards.reverse()))
      .catch(console.log);
    }
  },[loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.putLike(card._id, isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(console.log);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
        setCards((state) => state.filter(c => c._id !== card._id));
    })
    .catch(console.log);
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);

    api.postCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
    })
    .then(closeAllPopups)
    .catch(console.log)
    .finally(() => setIsLoading(false));
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

  useEffect(() => {
    function closeByEscape(e) {
      if(e.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  return (
    <div className="App">

      <Header email={email} onLogout={tokenDelete}/>

      <CurrentUserContext.Provider value={currentUser}>

        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path="/signin">
            <Login onLogin={handleLogin}/>
          </Route>

          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>

          <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>

        </Switch>

        <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
        />

      </CurrentUserContext.Provider>

      {loggedIn && <Footer />}

      <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
      />

      <ConfirmationPopup />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        onClose={closeAllPopups}
        isOpen={isInfoTooltipPopupOpen}
        isComplete={isRegistrationComplete}
      />

    </div>
  );
}

export default App;
