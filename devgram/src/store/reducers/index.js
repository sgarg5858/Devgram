import {combineReducers} from 'redux';
import auth from './Auth';
import profile from './Profile';
import alert from './alert';

export default combineReducers({
    auth,profile,alert
});