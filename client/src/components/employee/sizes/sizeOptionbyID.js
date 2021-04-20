import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSizes } from "../../../actions/size";

const SizeOptionsbyID = ({ getSizes, sizes }) => {
  useEffect(() => {
    getSizes();
  }, [getSizes]);

  return (
    sizes !== null &&
    sizes.map((size) => (
      <option
        key={size._id}
        value={size._id + "$" + size.packing_type + " " + size.unit}
      >
        {size.packing_type + " " + size.unit}
      </option>
    ))
  );
};

SizeOptionsbyID.propTypes = {
  sizes: PropTypes.object.isRequired,
  getSizes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sizes: state.size.sizes,
});

export default connect(mapStateToProps, { getSizes })(SizeOptionsbyID);
