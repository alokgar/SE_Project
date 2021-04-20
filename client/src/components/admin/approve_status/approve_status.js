import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";

import { changeStatus } from "../../../actions/status";
import { getUsers } from "../../../actions/status";
import Alert from "../../layout/Alert";
import Table from "react-bootstrap/Table";
import { Button, Row, Col } from "react-bootstrap";
const Approve_status = ({ getUsers, status: { users }, changeStatus }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return users.length === 0 ? (
    <div
      style={{
        height: "100%",
        width: "100%",
        textAlign: "center",
        padding: "100px 0px",
      }}
    >
      <b>No Entry Found!</b>
    </div>
  ) : (
    <Fragment>
      <Alert />
      <div style={{ width: "100%", overflow: "auto" }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(function (user) {
              var id = user.email;
              return user.status == "Pending" ? (
                <tr>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.type}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="success"
                      onClick={() => {
                        changeStatus({ id, i: 0 });
                      }}
                    >
                      ✓
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        changeStatus({ id, i: 1 });
                      }}
                    >
                      ✗<i class="fa fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ) : null;
            })}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};

Approve_status.propTypes = {
  changeStatus: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  status: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps, { changeStatus, getUsers })(
  Approve_status
);
