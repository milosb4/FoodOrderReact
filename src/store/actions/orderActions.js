import * as actionTypes from '../actions';
import * as orderFoodApi from '../../api/orderFoodApi';
import { apiCallError, beginApiCall } from './apiStatusAction';

export function loadOrdersSuccess(orders) {
    return { type: actionTypes.LOAD_ORDERS_SUCCESS, orders };
}

export function loadOrders(shift) {
    return function (dispatch) {
        return orderFoodApi
            .getOrders(shift)
            .then((orders) => {
                dispatch(loadOrdersSuccess(orders));
            })
            .catch((error) => {
                throw error;
            });
    };
}
