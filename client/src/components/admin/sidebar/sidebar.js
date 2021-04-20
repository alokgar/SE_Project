import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
          <li>
            <h5 style={{ textAlign: "center" }}>
              Welcome {user && user.first_name}
            </h5>
          </li>
        </ul>
        <ListGroup
          style={{ margin: "20px 0px 50px 0px" }}
          defaultActiveKey={link}
        >
          <ListGroup.Item className="sidebar-item" action href="/products">
            Products
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/employees">
            Employees
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/customers">
            Customers
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/stocks">
            Stocks
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/orders">
            Orders
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/sales">
            Sales
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/production">
            Production
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/suppliers">
            Suppliers
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/raw_materials">
            Raw Materials
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/payments">
            Payments
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/feedbacks">
            Feedbacks
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/sizes">
            Sizes
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-item" action href="/category">
            Category
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
