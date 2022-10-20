import initialState from './initialState';
import * as types from '../actions';

export default function orderReducer(state = initialState.orders, action) {
    switch (action.type) {
        case types.LOAD_ORDERS_SUCCESS:
            return action.orders;
        case types.UPDATE_ORDER_SUCCESS:
            return [...state, { ...action.order }];
        case types.UPDATE_ORDER_SUCCESS:
            return state.map((order) => (order.id === action.order.id ? action.order : order));
        default:
            return state;
    }
}
