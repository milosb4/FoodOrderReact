import * as actionTypes from '../actions';
import * as orderFoodApi from '../../api/orderFoodApi';
import { apiCallError, beginApiCall } from './apiStatusAction';

export function loadTemplatesSuccess(templates) {
    return { type: actionTypes.LOAD_TEMPLATES_SUCCESS, templates };
}

export function createTemplateSuccess(template) {
    return { type: actionTypes.CREATE_TEMPLATE_SUCCESS, template };
}
export function editTemplateSuccess(template) {
    return { type: actionTypes.EDIT_TEMPLATE_SUCCESS, template };
}

export function deleteTemplateOptimistic(template) {
    return { type: actionTypes.DELETE_TEMPLATE_OPTIMISTIC, template };
}

export function assignMealsSuccess(template) {
    return { type: actionTypes.ASSIGN_MEALS_SUCCESS, template };
}

export function loadTemplates() {
    return function (dispatch) {
        return orderFoodApi
            .getTemplates()
            .then((templates) => {
                dispatch(loadTemplatesSuccess(templates));
            })
            .catch((error) => {
                throw error;
            });
    };
}

export function addTemplate(name) {
    //eslint-disable-next-line no-unused-vars
    return function (dispatch, getState) {
        dispatch(beginApiCall());
        return orderFoodApi
            .addTemplate()
            .then((template) => {
                dispatch(createTemplateSuccess(template));
            })
            .catch((error) => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}

export function editTemplate(model) {
    //eslint-disable-next-line no-unused-vars
    return function (dispatch, getState) {
        dispatch(beginApiCall());
        return orderFoodApi
            .editTemplate(model)
            .then((template) => {
                dispatch(editTemplateSuccess(template));
            })
            .catch((error) => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}

export function deleteTemplate(template) {
    return function (dispatch) {
        // Doing optimistic delete, so not dispatching begin/end api call
        // actions, or apiCallError action since we're not showing the loading status for this.
        dispatch(deleteTemplateOptimistic(template));
        return orderFoodApi.deleteTemplate(template.id);
    };
}

export function assignMeals(template) {
    return function (dispatch) {
        // Doing optimistic delete, so not dispatching begin/end api call
        // actions, or apiCallError action since we're not showing the loading status for this.
        dispatch(assignMealsSuccess(template));
        return orderFoodApi.assignMealsToTemplate(template);
    };
}
