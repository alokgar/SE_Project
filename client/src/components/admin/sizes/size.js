import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSizes, addSize, editSize } from "../../../actions/size";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";
import Sidebar1 from "../sidebar/sidebar";
import Alert from "../../layout/Alert";
// import Edit_size from './Edit_size';

const Size = ({ getSizes, addSize, editSize, sizes }) => {
  useEffect(() => {
    getSizes();
  }, [getSizes]);

  const [showTable, setTable] = useState(true);
  const [formData, setFormData] = useState({
    packing_type: "",
    unit: "",
  });

  const { packing_type, unit } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    addSize({ packing_type, unit });
    setFormData({
      packing_type: "",
      unit: "",
    });
    setTable(!showTable);
  };

  return sizes === null ? (
    <div></div>
  ) : (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/sizes" />
      <div className="col-md-10 mainContainer">
        <p
          style={{
            borderBottom: "1px solid black ",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#17a2b8",
          }}
        >
          <Alert />
          Size
        </p>
        <div className="tableDiv">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Packing_type</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {sizes.length !== 0 ? (
                sizes.map(function (size) {
                  return (
                    <tr>
                      <td>{size.packing_type}</td>
                      <td>{size.unit}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    No Entry Found !{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <Button variant="primary" onClick={() => setTable(!showTable)}>
          Add Size
        </Button>
        <br></br>
        {showTable === false ? (
          <Fragment>
            <br />
            <h2>Add Size</h2>
            <br />

            <Form onSubmit={(e) => onSubmit(e)} style={{ width: "60%" }}>
              <Form.Group>
                <Form.Label>Packing_type</Form.Label>
                <Form.Control
                  required
                  type="text"
                  pattern="^0*[1-9]\d*"
                  title="Provide greater than 0"
                  placeholder="packing_type"
                  name="packing_type"
                  value={packing_type}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Unit</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="unit"
                  name="unit"
                  value={unit}
                  onChange={(e) => onChange(e)}
                  required
                />
              </Form.Group>

              <Button type="submit">Add Size</Button>
              <Button
                variant="outline-primary"
                onClick={() => setTable(!showTable)}
              >
                Cancel
              </Button>
            </Form>
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

Size.propTypes = {
  getSizes: PropTypes.func.isRequired,
  addSize: PropTypes.func.isRequired,
  editSize: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sizes: state.size.sizes,
});

export default connect(mapStateToProps, { getSizes, addSize, editSize })(Size);
