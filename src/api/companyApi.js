import { handleResponse, handleError } from './apiUtils';
const baseUrl = process.env.REACT_APP_SERVER_URL + 'Admin/';

export function getCompanies() {
    return fetch(baseUrl + 'company')
        .then(handleResponse)
        .catch(handleError);
}

export function addCompany(companyName) {
    return fetch(baseUrl + 'company?companyName=' + (companyName || ''), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: ''
    })
        .then(handleResponse)
        .catch(handleError);
}

export function deleteCompany(company) {
    return fetch(baseUrl + 'company?id=' + (company || ''), {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: ''
    })
        .then(handleResponse)
        .catch(handleError);
}

export function getLocations(id) {
    return fetch(baseUrl + 'locations?companyId=' + id)
        .then(handleResponse)
        .catch(handleError);
}

export function deleteLocation(location) {
    return fetch(baseUrl + 'location?id=' + (location || ''), {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: ''
    })
        .then(handleResponse)
        .catch(handleError);
}

export function addLocation(model) {
    return fetch(baseUrl + 'location', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(model)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function getUsers(location) {
    return fetch(baseUrl + 'users?locationId=' + location)
        .then(handleResponse)
        .catch(handleError);
}

export function addUser(model) {
    return fetch(baseUrl + 'users', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(model)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function deleteUsers(users) {
    return fetch(baseUrl + 'users', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(users)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function activateUsers(users) {
    return fetch(baseUrl + 'users', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(users)
    })
        .then(handleResponse)
        .catch(handleError);
}
