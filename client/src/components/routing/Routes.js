import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';

import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import Product from '../products/product';
import Raw_material from '../raw_materials/raw_material';
import Supplier from '../suppliers/supplier';

import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/products' component={Product} />
        <PrivateRoute exact path='/raw_materials' component={Raw_material} />
        <PrivateRoute exact path='/suppliers' component={Supplier} />
      </Switch>
    </section>
  );
};

export default Routes;