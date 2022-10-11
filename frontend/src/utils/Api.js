import {configApi} from './constants'

class Api {
    constructor(configApi) {
        this._url = configApi.url;
        this._token = localStorage.getItem('token');
    }

    _fetchRoutine = (res) => {
        if(res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
              authorization: `Bearer ${this._token}`
            }
        })
        .then(this._fetchRoutine)
    }

    postCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
              authorization: `Bearer ${this._token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(this._fetchRoutine)
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
              authorization: `Bearer ${this._token}`,
              'Content-Type': 'application/json'
            }
        })
        .then(this._fetchRoutine)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: `Bearer ${this._token}`
            }
        })
        .then(this._fetchRoutine)
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
              authorization: `Bearer ${this._token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(this._fetchRoutine)
    }

    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
              authorization: `Bearer ${this._token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(this._fetchRoutine)
    }

    putLike(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: {
              authorization: `Bearer ${this._token}`,
              'Content-Type': 'application/json'
            },
        })
        .then(this._fetchRoutine)
    }

    getLikes(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            headers: {
                authorization: `Bearer ${this._token}`
            }
        })
        .then(this._fetchRoutine)
    }
}

const api = new Api(configApi);

export default api;