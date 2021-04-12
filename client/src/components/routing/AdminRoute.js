import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const AdminRoute = ({
  logout,
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          if (user.type !== "Admin") {
            console.log(user.type);
            logout();
            return <Redirect to="/login" />;
          }
          if (!isAuthenticated && !loading) {
            return <Redirect to="/login" />;
          } else {
            return <Component {...props} />;
          }
        }
      }}
    />
  );
};
AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(AdminRoute);
