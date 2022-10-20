import * as actionTypes from '../actions';
import * as orderFoodApi from '../../api/orderFoodApi';
import { apiCallError, beginApiCall } from './apiStatusAction';

export function loadMealsSuccess(meals) {
    return { type: actionTypes.LOAD_MEALS_SUCCESS, meals };
}

export function createMealSuccess(meal) {
    return { type: actionTypes.CREATE_MEAL_SUCCESS, meal };
}

export function deleteMealsOptimictic(meals) {
    return { type: actionTypes.DELETE_MEALS_OPTIMISTIC, meals };
}

export function updateMealsIsActive(selected) {
    return { type: actionTypes.UPDATE_MEALS_IS_ACTIVE, selected };
}

export function editMealSuccess(meal) {
    return { type: actionTypes.EDIT_MEAL_SUCCESS, meal };
}

export function loadMeals() {
    return function (dispatch) {
        return orderFoodApi
            .getMeals()
            .then((meals) => {
                meals = meals.map((meal) => {
                    return { id: meal.id, name: meal.name, isActive: false };
                });
                dispatch(loadMealsSuccess(meals));
            })
            .catch((error) => {
                throw error;
            });
    };
}

export function addMeal(name) {
    //eslint-disable-next-line no-unused-vars
    return function (dispatch, getState) {
        dispatch(beginApiCall());
        return orderFoodApi
            .addMeal(name)
            .then((meal) => {
                meal['isActive'] = false;
                dispatch(createMealSuccess(meal));
            })
            .catch((error) => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}

export function editMeal(model) {
    //eslint-disable-next-line no-unused-vars
    return function (dispatch, getState) {
        dispatch(beginApiCall());
        return orderFoodApi
            .editMeal({ id: model.id, name: model.name })
            .then((response) => {
                dispatch(editMealSuccess(model));
            })
            .catch((error) => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}

export function deleteMeals(meals) {
    return function (dispatch) {
        // Doing optimistic delete, so not dispatching begin/end api call
        // actions, or apiCallError action since we're not showing the loading status for this.
        dispatch(deleteMealsOptimictic(meals));
        return orderFoodApi.deleteMeals(meals);
    };
}
