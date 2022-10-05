import * as actionTypes from '../actions';
import * as companyApi from '../../api/companyApi';

export function loadLocationsSuccess(locations) {
    return { type: actionTypes.LOAD_LOCATIONS_SUCCESS, locations };
}

export function deleteLocationOptimistic(location) {
    return { type: actionTypes.DELETE_LOCATION_OPTIMISTIC, location };
}

export function loadLocations(id) {
    return function (dispatch) {
        return companyApi.getLocations(id).then((locations) => {
            dispatch(loadLocationsSuccess(locations));
        });
    };
}

export function deleteLocation(location) {
    return function (dispatch) {
        // Doing optimistic delete, so not dispatching begin/end api call
        // actions, or apiCallError action since we're not showing the loading status for this.
        dispatch(deleteLocationOptimistic(location));
        return companyApi.deleteLocation(location);
    };
}
