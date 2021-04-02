import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';

import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import Product from '../products/product';
import Customer from '../customers/customer';
import Raw_material from '../raw_materials/raw_material';
import Supplier from '../suppliers/supplier';
import Stock from '../stocks/stock';
import Size from '../sizes/size';
import Feedback from '../feedbacks/feedback';
import Payment from '../payments/payment';
import Cust_profile from '../customers/customerProfile';
import Order from '../orders/orders';
import ShowFilteredProducts from '../products/ShowFilteredProducts';
import ShowFilteredRaw_materials from '../raw_materials/ShowFilteredRaw_materials';

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
        <PrivateRoute exact path='/customers' component={Customer} />
        <PrivateRoute exact path='/feedbacks' component={Feedback} />
        <PrivateRoute exact path='/raw_materials' component={Raw_material} />
        <PrivateRoute exact path='/suppliers' component={Supplier} />
        <PrivateRoute exact path='/payments' component={Payment} />
        <PrivateRoute exact path='/customer/:id' component={Cust_profile} />
        <PrivateRoute exact path='/stocks' component={Stock} />
        <PrivateRoute exact path='/sizes' component={Size} />
        <PrivateRoute exact path='/orders' component={Order} />
        <PrivateRoute exact path='/show_filtered_products' component={ShowFilteredProducts} />
        <PrivateRoute exact path='/show_filtered_raw_materials' component={ShowFilteredRaw_materials} />

      </Switch>
    </section>
  );
};

export default Routes;