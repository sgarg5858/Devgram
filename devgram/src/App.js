import React,{useState,Fragment} from 'react';
import{BrowserRouter,Switch,Route} from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard'
//Redux
import {Provider} from 'react-redux';
import store from './store/store';
function App() {



  return (
   <Fragment>
     <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/myprofile" exact component={Dashboard} />
        </Switch>
      </BrowserRouter>
     </Provider>
    
   </Fragment>
  );
}

export default App;
