import * as actionTypes from '../actions';
import * as companyApi from '../../api/companyApi';
import { beginApiCall, apiCallError } from '../actions/apiStatusAction';

export function loadCompanySuccess(companies) {
    return { type: actionTypes.LOAD_COMPANY_SUCCESS, companies };
}

export function createCompanySuccess(company) {
    return { type: actionTypes.CREATE_COMPANY_SUCCESS, course };
}

export function loadCompany() {
    return function (dispatch) {
        return companyApi
            .getCompanies()
            .then((companies) => {
                dispatch(loadCompanySuccess(companies));
            })
            .catch((error) => {
                throw error;
            });
    };
}

export function addCompany(companyName) {
    //eslint-disable-next-line no-unused-vars
    return function (dispatch, getState) {
        dispatch(beginApiCall());
        return companyApi
            .addCompany(companyName)
            .then((company) => {
                dispatch(createCompanySuccess(company));
            })
            .catch((error) => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}
