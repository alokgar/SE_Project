import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCustomers ,addCustomer,editCustomer,deleteCustomer} from '../../actions/customer';

const CustomerOptions = ({ getCustomers, customers }) => {
    useEffect(() => {
        getCustomers ();
    }, [getCustomers ]);

    return (
        customers !== null && customers.map(customer =>
            <option key={customer._id}
                value={customer._id}>
                {customer.first_name}
            </option>
        )
    )
}

CustomerOptions.propTypes = {
    customers: PropTypes.object.isRequired,
    getCustomers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    customers: state.customer.customers
});

export default connect(mapStateToProps, { getCustomers  })(CustomerOptions);
