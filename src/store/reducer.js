import { combineReducers } from 'redux';
import companies from './reducers/companyReducer';
import locations from './reducers/locationReducer';
import users from './reducers/userReducer';
import templates from './reducers/templateReducer';
import meals from './reducers/mealReducer';
// reducer import
import customizationReducer from './customizationReducer';
import apiCallsInProgress from './reducers/apiStatusReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    companies,
    locations,
    users,
    templates,
    meals,
    apiCallsInProgress
});

export default reducer;
