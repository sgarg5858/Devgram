import React,{useEffect,Fragment} from 'react';
import './App.css';
import{BrowserRouter,Switch,Route, Redirect} from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard'
//Redux
import {Provider} from 'react-redux';
import store from './store/store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './store/actions/Auth';
import DevNavbar from './components/Layout/DevNavbar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import Alerts from './components/Layout/Alerts';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/Profiles/Profiles';
import Profile from './components/Profile/Profile';
import Posts from './components/posts/Posts';
if(localStorage.token)
{
  setAuthToken(localStorage.token);
}

function App() {

  useEffect(()=>{
    store.dispatch(loadUser());
  },[])
  return (
   <Fragment>
     <Provider store={store}>
      
      <BrowserRouter>
        <DevNavbar/>
        <Alerts />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/create-profile" exact component={CreateProfile} />
          <PrivateRoute path="/edit-profile" exact component={EditProfile} />
          <PrivateRoute path="/add-experience" exact component={AddExperience} />
          <PrivateRoute path="/add-education" exact component={AddEducation} />
          <PrivateRoute path="/community" exact component={Profiles} />
          <PrivateRoute path="/profile/:id" exact component={Profile} />
          <PrivateRoute path="/feed" exact component={Posts} />
          <Redirect from ="/" to ="/login" />
        </Switch>
      </BrowserRouter>
     </Provider>
    
   </Fragment>
  );
}

export default App;
