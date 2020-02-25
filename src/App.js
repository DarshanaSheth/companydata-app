import React from 'react';

import './App.css';
import {Home} from './components/Home'
import {Customer} from './components/Customer'
import {Product} from './components/Product'
import {Store} from './components/Store'
import {Sale} from './components/Sale'
import {Navigation} from './components/Navigation'



import {BrowserRouter, Route, Switch} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <div className="container">

      <h3 className="m-3 d-flex justify-content-center">
        React Company details form </h3>
      <h5 className= "m3 d-flex justify-content-center">
        Customer-Sale-Product-Store Portal</h5>
        <Navigation/>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/customer' component={Customer}/>
        <Route path='/product' component={Product}/>
        <Route path='/store' component={Store}/>
        <Route path='/sale' component={Sale}/>
      </Switch>


    </div>
    </BrowserRouter>
  );
}

export default App;
