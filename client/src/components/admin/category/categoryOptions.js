import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategory } from "../../../actions/category";

const SizeOptions = ({ getCategory, category }) => {
  useEffect(() => {
    getCategory();
  }, [getCategory]);

  return (
    category !== null &&
    category.map((cat) => (
      <option key={cat._id} val={cat.name}>
        {cat.name}
      </option>
    ))
  );
};

SizeOptions.propTypes = {
  category: PropTypes.object.isRequired,
  getCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category.category,
});

export default connect(mapStateToProps, { getCategory })(SizeOptions);
