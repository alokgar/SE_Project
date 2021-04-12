import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { Button, Row, Col } from "react-bootstrap";

const ShowFilteredProductionDetails = ({
    production_details
}) => {
    return production_details.length === 0 ? (

        <div></div>) : (
        <Fragment>
            All filtered production-details are shown here
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Packaging-type</th>
                        <th>Total-Production</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        production_details.map(function (detail) {
                            if (detail === undefined) {
                                return (
                                    <div></div>
                                )
                            }
                            return (
                                <div>
                                    <tr>
                                        <td>{detail.product_id.name}</td>
                                        <td>{detail.size_id.packing_type}</td>
                                        <td>{detail.new_quantity - detail.prev_quantity}</td>
                                        <td>{Date(detail.date)}</td>
                                    </tr>
                                </div>
                            )

                        })
                    }
                </tbody>
            </Table>
            <form className='form'>
                <Button variant="outline-primary" size="lg" href="/products" style={{ float: "right", marginRight: "20px" }}>
                    Back
                </Button>
            </form>

        </Fragment>
    );
};



// ShowFilteredProductionDetails.propTypes = {
//     addProduct: PropTypes.func.isRequired,
//     editProduct: PropTypes.func.isRequired,
//     clearFilterProduct: PropTypes.func.isRequired
// };

const mapStateToProps = state => ({
    production_details: state.production_detail.production_details
});

export default connect(
    mapStateToProps,
    {}
)(ShowFilteredProductionDetails);