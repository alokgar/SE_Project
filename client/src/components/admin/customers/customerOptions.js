import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCustomers } from "../../../actions/customer";

const CustomerOptions = ({ getCustomers, customers, id }) => {
  useEffect(() => {
    getCustomers();
  }, [getCustomers]);
  console.log(id);
  return (
    customers !== null &&
    customers.map((customer) =>
      id === customer._id ? (
        <option key={customer._id} value={customer._id} selected>
          {customer.first_name} {customer.last_name}
        </option>
      ) : (
        <option key={customer._id} value={customer._id}>
          {customer.first_name} {customer.last_name}
        </option>
      )
    )
  );
};

CustomerOptions.propTypes = {
  customers: PropTypes.object.isRequired,
  getCustomers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  customers: state.customer.customers,
});

export default connect(mapStateToProps, { getCustomers })(CustomerOptions);
