import React from "react";
import { Route, Switch } from "react-router-dom";

import Register from "../auth/Register";
import Login from "../auth/Login";

import ProductionDetails from "../admin/production_details/ShowFilteredProductionDetails";
import Dashboard from "../admin/dashboard/Dashboard";
import Product from "../admin/products/product";
import Customer from "../admin/customers/customer";
import Raw_material from "../admin/raw_materials/raw_material";
import Supplier from "../admin/suppliers/supplier";
import Stock from "../admin/stocks/stock";
import Size from "../admin/sizes/size";
import Feedback from "../admin/feedbacks/feedback";
import Payment from "../admin/payments/payment";
import Cust_profile from "../admin/customers/customerProfile";
import Order from "../admin/orders/orders";
import Category from "../admin/category/category";
import Sales from "../admin/sales/sales";
import Profile from "../admin/profile/Profile";
import Employees from "../admin/users/users";

import EmpDashboard from "../employee/dashboard/Dashboard";
import EmpProduct from "../employee/products/product";
import EmpCustomer from "../employee/customers/customer";
import EmpStock from "../employee/stocks/stock";
import EmpFeedback from "../employee/feedbacks/feedback";
import EmpPayment from "../employee/payments/payment";
import EmpCust_profile from "../employee/customers/customerProfile";
import EmpOrder from "../employee/orders/orders";
import EmpProfile from "../employee/profile/Profile";

import AdminRoute from "./AdminRoute";
import EmployeeRoute from "./EmployeeRoute";

const Routes = () => {
  return (
    <section className="container">
      {/* <Alert /> */}
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

        <AdminRoute exact path="/dashboard" component={Dashboard} />
        <AdminRoute exact path="/products" component={Product} />
        <AdminRoute exact path="/customers" component={Customer} />
        <AdminRoute exact path="/feedbacks" component={Feedback} />
        <AdminRoute exact path="/raw_materials" component={Raw_material} />
        <AdminRoute exact path="/suppliers" component={Supplier} />
        <AdminRoute exact path="/payments" component={Payment} />
        <AdminRoute exact path="/customer/:id" component={Cust_profile} />
        <AdminRoute exact path="/stocks" component={Stock} />
        <AdminRoute exact path="/sizes" component={Size} />
        <AdminRoute exact path="/orders" component={Order} />
        <AdminRoute exact path="/category" component={Category} />
        <AdminRoute exact path="/profile/:id" component={Profile} />
        <AdminRoute exact path="/employees" component={Employees} />
        <AdminRoute exact path="/sales" component={Sales} />
        <AdminRoute exact path="/production" component={ProductionDetails} />

        <EmployeeRoute exact path="/emp/dashboard" component={EmpDashboard} />
        <EmployeeRoute exact path="/emp/products" component={EmpProduct} />
        <EmployeeRoute exact path="/emp/customers" component={EmpCustomer} />
        <EmployeeRoute exact path="/emp/feedbacks" component={EmpFeedback} />
        <EmployeeRoute exact path="/emp/payments" component={EmpPayment} />
        <EmployeeRoute exact path="/emp/stocks" component={EmpStock} />
        <EmployeeRoute exact path="/emp/orders" component={EmpOrder} />
        <EmployeeRoute exact path="/emp/profile/:id" component={EmpProfile} />
        <EmployeeRoute
          exact
          path="/emp/customer/:id"
          component={EmpCust_profile}
        />
      </Switch>
    </section>
  );
};

export default Routes;
