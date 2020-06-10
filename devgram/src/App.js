import React,{useEffect,Fragment} from 'react';
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
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/myprofile" exact component={Dashboard} />
          <Redirect from ="/" to ="/login" />
        </Switch>
      </BrowserRouter>
     </Provider>
    
   </Fragment>
  );
}

export default App;
