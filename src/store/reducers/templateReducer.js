import initialState from './initialState';
import * as types from '../actions';

export default function templateReducer(state = initialState.templates, action) {
    switch (action.type) {
        case types.LOAD_TEMPLATES_SUCCESS:
            return action.templates;
        case types.CREATE_TEMPLATE_SUCCESS:
            return [...state, { ...action.template }];
        case types.EDIT_TEMPLATE_SUCCESS:
            return state.map((template) => (template.id === action.template.id ? action.template : template));
        case types.DELETE_TEMPLATE_OPTIMISTIC:
            return state.filter((template) => template.id !== action.template.id);
        case types.ASSIGN_MEALS_SUCCESS:
            return setMeals(state, action.template);
        // // return state.map((user) => setActive(user, action.users, false));
        // case types.ACTIVATE_USERS_OPTIMISTIC:
        //     return setActive(state, action.users, true);
        // // return state.map((user) => setActive(user, action.users, true));
        default:
            return state;
    }
}

function setMeals(state, template) {
    return state.map((x) => {
        if (template.id == x.id) {
            return Object.assign({}, x, {
                foodIds: template.meals
            });
        }
        return x;
    });
}
