// you can change the port number at server/index.js
const api = "http://localhost:4002"

const API_KEY = '__api_key__'

const headers = {
  'Accept': 'application/json',
  'Authorization': API_KEY
}

// create an account
export const createAccount = (params) =>
  fetch(`${api}/create_user`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())

// signin
export const signinWithPassword = (params) =>
  fetch(`${api}/login_with_email_password`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())


// upload
export const upload = (data) =>
  fetch(`${api}/files`, {
    method: 'POST',
    body: data
  }).then(res => res.json())

// signin with token
export const signinWithToken = (params) =>
  fetch(`${api}/login_with_token`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())

// logout
export const logout = (params) =>
  fetch(`${api}/logout`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())

  //income
export const income = (params) => 
  fetch(`${api}/set_income`, {
    method: 'POST' ,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())

//expenses
export const expenses = (params) =>
  fetch(`${api}/set_expenses`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )
  }).then(res => res.json())

  export const get_access_token = function(url = ``, data = {}) {

    return fetch(url, {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',

      },
      body: JSON.stringify(data)
    }).then(response => response.json());
}

export const getIncome = () =>
  fetch(`${api}/get_income`, {
    method: 'GET' ,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify()
  }).then(res => res.json())
    .catch(error => console.error(error))

export const get_balance = function(url = ``, data = {}) {

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify()
  }).then(response => response.json());
}
