import * as types from '../actions';
import initialState from './initialState';

export default function userReducer(state = initialState.users, action) {
    switch (action.type) {
        case types.LOAD_USERS_SUCCESS:
            return action.users;
        case types.CREATE_USER_SUCCESS:
            return [...state, { ...action.user }];
        case types.DELETE_USERS_OPTIMISTIC:
            return setActive(state, action.users, false);
        // return state.map((user) => setActive(user, action.users, false));
        case types.ACTIVATE_USERS_OPTIMISTIC:
            return setActive(state, action.users, true);
        // return state.map((user) => setActive(user, action.users, true));
        default:
            return state;
    }
}

function setActive(state, users, activate) {
    return state.map((x) => {
        if (users.find((y) => y.id == x.id)) {
            return Object.assign({}, x, {
                isActive: activate
            });
        }
        return x;
    });
}
