import * as actionTypes from '../actions';
import * as companyApi from '../../api/companyApi';

export function loadLocationsSuccess(locations) {
    return { type: actionTypes.LOAD_LOCATIONS_SUCCESS, locations };
}

export function loadLocations(id) {
    return function (dispatch) {
        return companyApi.getLocations(id).then((locations) => {
            dispatch(loadLocationsSuccess(locations));
        });
    };
}
