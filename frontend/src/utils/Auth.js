export const BASE_URL = 'http://api.myplace.nomoredomains.icu';

const _fetchRoutine = (res) => {
    if(res.ok) {
        return res.json();
    }
    else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
    .then(_fetchRoutine)
}

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
    .then(_fetchRoutine)
}

export const authorize = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    .then(_fetchRoutine)
}