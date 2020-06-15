import {combineReducers} from 'redux';
import auth from './Auth';
import profile from './Profile';
import alert from './alert';
import post from './post';

export default combineReducers({
    auth,profile,alert,post
});