import * as actionTypes from '../actions';
import * as orderFoodApi from '../../api/orderFoodApi';
import { apiCallError, beginApiCall } from './apiStatusAction';

export function loadOrdersSuccess(orders) {
    return { type: actionTypes.LOAD_ORDERS_SUCCESS, orders };
}

export function createOrderSuccess(order) {
    return { type: actionTypes.CREATE_ORDER_SUCCESS, order };
}

export function updateOrderSuccess(order) {
    return { type: actionTypes.UPDATE_ORDER_SUCCESS, order };
}

export function loadOrders(shift) {
    return function (dispatch) {
        return orderFoodApi
            .getOrders(shift)
            .then((orders) => {
                console.log(orders);
                debugger;
                dispatch(loadOrdersSuccess(orders));
            })
            .catch((error) => {
                throw error;
            });
    };
}

export function addOrder(order) {
    //eslint-disable-next-line no-unused-vars
    return function (dispatch, getState) {
        debugger;
        dispatch(beginApiCall());
        return orderFoodApi
            .addOrder(order)
            .then(() => {
                dispatch(createOrderSuccess(order));
            })
            .catch((error) => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}

export function editOrder(order) {
    //eslint-disable-next-line no-unused-vars
    return function (dispatch, getState) {
        debugger;
        dispatch(beginApiCall());
        return orderFoodApi
            .editOrder(order)
            .then(() => {
                dispatch(updateOrderSuccess(order));
            })
            .catch((error) => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}
