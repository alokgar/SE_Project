import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import { getCurrentProfile, deleteAccount } from "../../../actions/profile";
import Sidebar1 from "../sidebar/sidebar";
import { Row, Button, Col, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Datacard, Tablecard } from "../helper/card";

const Dashboard = ({
  getCurrentProfile,

  deleteAccount,
  auth: { user },

  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/dashboard" />
      <div className="col-md-10 mainContainer ScrollDiv">
        <Row style={{ justifyContent: "space-evenly" }}>
          <Col xs={3}>
            <Datacard
              title={"Sales"}
              subtitle={260}
              link={"/sales"}
              color={"#343a40"}
            />
          </Col>
          <Col xs={3}>
            <Datacard
              title={"Sales"}
              subtitle={260}
              link={"/sales"}
              color={"#343a40"}
            />
          </Col>
          <Col xs={3}>
            <Datacard
              title={"Sales"}
              subtitle={260}
              link={"/sales"}
              color={"#343a40"}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "30px" }}>
          <Col>
            {profile !== null ? (
              <Fragment>
                <div className="my-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteAccount()}
                  >
                    <i className="fas fa-user-minus" /> Delete My Account
                  </button>
                </div>
              </Fragment>
            ) : (
              <div>
                <Tablecard title={"New Employees"} link={"/employees"} />
              </div>
            )}
          </Col>
          <Col>
            <Tablecard title={"Pending Queries"} link={"/employees"} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,

  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
