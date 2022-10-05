import * as types from '../actions';
import initialState from './initialState';

export default function companyReducer(state = initialState.companies, action) {
    switch (action.type) {
        case types.CREATE_COMPANY_SUCCESS:
            return [...state, { ...action.company }];
        case types.LOAD_COMPANY_SUCCESS:
            return action.companies;
        case types.DELETE_COMPANY_OPTIMISTIC:
            return state.filter((company) => company.companyId !== action.company);
        default:
            return state;
    }
}
