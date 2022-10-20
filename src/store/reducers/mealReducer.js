import initialState from './initialState';
import * as types from '../actions';

export default function mealReducer(state = initialState.meals, action) {
    switch (action.type) {
        case types.LOAD_MEALS_SUCCESS:
            return action.meals;
        case types.CREATE_MEAL_SUCCESS:
            return [...state, { ...action.meal }];
        case types.DELETE_MEALS_OPTIMISTIC:
            return state.filter((meal) => !action.meals.includes(meal.id));
        case types.UPDATE_MEALS_IS_ACTIVE:
            return setIsActive(state, action.selected);
        case types.EDIT_MEAL_SUCCESS:
            return state.map((meal) => (meal.id === action.meal.id ? action.meal : meal));
        default:
            return state;
    }
}

function setIsActive(state, selected) {
    return state.map((meal) => {
        if (selected.includes(meal.id)) {
            return { id: meal.id, name: meal.name, isActive: true };
        } else {
            return { id: meal.id, name: meal.name, isActive: false };
        }
    });
}
