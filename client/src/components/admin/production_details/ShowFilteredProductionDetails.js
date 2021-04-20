import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { Button, Row, Col } from "react-bootstrap";
import { getProduction_details } from "../../../actions/production_detail";
import FilterProductionDetails from "./filterProductionDetails";
import Sidebar1 from "../sidebar/sidebar";

const ShowFilteredProductionDetails = ({
  production_details,
  getProduction_details,
}) => {
  useEffect(() => {
    getProduction_details({ from: 0, to: 0 });
  }, [getProduction_details]);

  return !production_details ? (
    <div></div>
  ) : (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/production" />
      <div className="col-md-8 mainContainer">
        <p
          style={{
            borderBottom: "1px solid black ",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#17a2b8",
          }}
        >
          Production Details
        </p>
        <div className="tableDiv">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Packaging</th>
                <th>Production</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {production_details.length != 0 ? (
                production_details.map(function (detail) {
                  if (detail === undefined) {
                    return <div></div>;
                  }
                  return (
                    <tr>
                      <td>{detail.product_id.name}</td>
                      <td>
                        {detail.size_id.packing_type +
                          " " +
                          detail.size_id.unit}
                      </td>
                      <td>
                        {detail.new_quantity - detail.prev_quantity}
                        {detail.size_id.unit === "ltr" ||
                        detail.size_id.unit === "ml"
                          ? " Ltr"
                          : " Kg"}
                      </td>
                      <td>{detail.date.toString().slice(0, 10)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No Entry{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        {/* <Button
          variant="outline-primary"
          size="lg"
          href="/products"
          style={{ float: "right", marginRight: "20px" }}
        >
          Back
        </Button> */}
      </div>
      <FilterProductionDetails />
    </div>
  );
};

ShowFilteredProductionDetails.propTypes = {
  getProduction_details: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  production_details: state.production_detail.production_details,
});

export default connect(mapStateToProps, { getProduction_details })(
  ShowFilteredProductionDetails
);
