import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Sidebar1 = ({ auth: { user }, link }) => {
  return (
    <Fragment>
      <div
        className="sidebar bg-dark col-md-2"
        style={{
          opacity: "0.9",
          height: "100%",
          width: "200px",
          height: "100%",
          overflow: "auto",
        }}
      >
        <ul style={{ margin: "30px 0px" }}>
          <li style={{ marginLeft: "50px" }}>
            <a href={`/emp/profile/${user._id}`}>
              <FontAwesomeIcon icon={faUser} size="5x" />
            </a>
          </li>
          <li>
            <h5 style={{ textAlign: "center", marginTop: "5px" }}>
              Welcome {user && user.first_name}
            </h5>
          </li>
        </ul>
        <ListGroup
          style={{ margin: "20px 0px 50px 0px" }}
          defaultActiveKey={link}
        >
          <ListGroup.Item className="sidebar-item" action href="/emp/dashboard">
            Dashboard
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/emp/products">
            Products
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/emp/customers">
            Customers
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/emp/stocks">
            Stocks
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/emp/orders">
            Orders
          </ListGroup.Item>

          <ListGroup.Item className="sidebar-item" action href="/emp/payments">
            Payments
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/emp/feedbacks">
            Feedbacks
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Fragment>
  );
};

Sidebar1.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Sidebar1);
