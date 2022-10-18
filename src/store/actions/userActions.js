import * as actionTypes from '../actions';
import * as companyApi from '../../api/companyApi';
import { apiCallError, beginApiCall } from './apiStatusAction';

export function loadUsersSuccess(users) {
    return { type: actionTypes.LOAD_USERS_SUCCESS, users };
}

export function loadUsers(location) {
    return function (dispatch) {
        return companyApi.getUsers(location).then((users) => {
            dispatch(loadUsersSuccess(users));
        });
    };
}

export function createUserSuccess(user) {
    return { type: actionTypes.CREATE_USER_SUCCESS, user };
}

export function deleteUsersOptimistic(users) {
    return { type: actionTypes.DELETE_USERS_OPTIMISTIC, users };
}

export function activateUsersOptimistic(users) {
    return { type: actionTypes.ACTIVATE_USERS_OPTIMISTIC, users };
}

export function addUser(model) {
    //eslint-disable-next-line no-unused-vars
    return function (dispatch, getState) {
        dispatch(beginApiCall());
        return companyApi
            .addUser(model)
            .then((user) => {
                dispatch(createUserSuccess(user));
            })
            .catch((error) => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}

export function deleteUsers(users) {
    return function (dispatch) {
        // Doing optimistic delete, so not dispatching begin/end api call
        // actions, or apiCallError action since we're not showing the loading status for this.
        dispatch(deleteUsersOptimistic(users));
        return companyApi.deleteUsers(users.map((user) => user.id));
    };
}

export function activateUsers(users) {
    return function (dispatch) {
        // Doing optimistic delete, so not dispatching begin/end api call
        // actions, or apiCallError action since we're not showing the loading status for this.
        dispatch(activateUsersOptimistic(users));
        return companyApi.activateUsers(users.map((user) => user.id));
    };
}
