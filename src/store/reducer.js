import { combineReducers } from 'redux';
import companies from './reducers/companyReducer';
import locations from './reducers/locationReducer';
// reducer import
import customizationReducer from './customizationReducer';
import apiCallsInProgress from './reducers/apiStatusReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    companies,
    locations,
    apiCallsInProgress
});

export default reducer;
