import { handleResponse, handleError } from './apiUtils';
const baseUrl = process.env.REACT_APP_SERVER_URL + 'MealManagement/';

export function getTemplates() {
    return fetch(baseUrl + 'templates')
        .then(handleResponse)
        .catch(handleError);
}

export function getMeals() {
    return fetch(baseUrl + 'meals')
        .then(handleResponse)
        .catch(handleError);
}

export function addTemplate(name) {
    return fetch(baseUrl + 'template?name=' + name, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: ''
    })
        .then(handleResponse)
        .catch(handleError);
}

export function editTemplate(model) {
    return fetch(baseUrl + 'template', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(model)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function deleteTemplate(id) {
    return fetch(baseUrl + 'template?id=' + id, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: ''
    })
        .then(handleResponse)
        .catch(handleError);
}

export function addMeal(name) {
    return fetch(baseUrl + 'meal?mealName=' + name, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: ''
    })
        .then(handleResponse)
        .catch(handleError);
}

export function deleteMeals(meals) {
    return fetch(baseUrl + 'meals', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(meals)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function editMeal(model) {
    return fetch(baseUrl + 'meal', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(model)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function assignMealsToTemplate(template) {
    return fetch(baseUrl + 'template/meals', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(template)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function getOrders(shift) {
    return fetch(baseUrl + 'orders?shift=' + shift)
        .then(handleResponse)
        .catch(handleError);
}

export function addOrder(order) {
    debugger;
    return fetch(baseUrl + 'order', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(order)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function editOrder(order) {
    return fetch(baseUrl + 'order', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(order)
    })
        .then(handleResponse)
        .catch(handleError);
}
