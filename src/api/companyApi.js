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
