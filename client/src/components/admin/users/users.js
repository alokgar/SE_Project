import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers } from "../../../actions/users";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";
import Sidebar1 from "../sidebar/sidebar";

const User = ({ getUsers, users }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return users === null ? (
    <div></div>
  ) : (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/users" />
      <div className="col-md-10 mainContainer">
        <p
          style={{
            borderBottom: "1px solid black ",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#17a2b8",
          }}
        >
          Employees
        </p>
        <div className="tableDiv">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile No.</th>
                <th>Salary</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.length !== 0 ? (
                users.map(function (user) {
                  return (
                    <tr>
                      <td>
                        <a
                          href={`/profile/${user._id}`}
                          style={{ color: "black" }}
                        >
                          {user.first_name + " " + user.last_name}
                        </a>
                      </td>

                      <td>{user.mobile_no}</td>
                      <td>{user.salary}</td>
                      <td>{user.email}</td>
                      {/* <td>
                      <Button variant="danger">Delete</Button>
                    </td> */}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No Entry Found !{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <br />
      </div>
    </div>
  );
};

User.propTypes = {
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users.users,
});

export default connect(mapStateToProps, {
  getUsers,
})(User);
