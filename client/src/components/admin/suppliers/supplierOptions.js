import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSuppliers } from "../../../actions/supplier";

const SupplierOptions = ({ getSuppliers, suppliers }) => {
  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  return (
    suppliers !== null &&
    suppliers.map((supplier) => (
      <option key={supplier._id} val={supplier.name}>
        {supplier.name}
      </option>
    ))
  );
};

SupplierOptions.propTypes = {
  suppliers: PropTypes.object.isRequired,
  getSuppliers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  suppliers: state.supplier.suppliers,
});

export default connect(mapStateToProps, { getSuppliers })(SupplierOptions);
