import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCategory,
  addCategory,
  editCategory,
} from "../../../actions/category";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";
import Sidebar1 from "../sidebar/sidebar";
// import Edit_category from './Edit_category';

const Category = ({ getCategory, addCategory, editCategory, category }) => {
  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const [showTable, setTable] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const { name, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    addCategory({ name, description });
    setFormData({
      name: "",
      description: "",
    });
    setTable(!showTable);
  };

  return category === null ? (
    <div></div>
  ) : (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/category" />
      <div className="col-md-10 mainContainer">
        <div className="tableDiv">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Packing_type</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {category.map(function (cat) {
                return (
                  <tr>
                    <td>{cat.name}</td>
                    <td>{cat.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <Button variant="primary" onClick={() => setTable(!showTable)}>
          Add Category
        </Button>
        <br></br>
        {showTable === false ? (
          <Fragment>
            <br />
            <h2>Add Category</h2>
            <br />

            <Form onSubmit={(e) => onSubmit(e)} style={{ width: "60%" }}>
              <Form.Group>
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Unit</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={(e) => onChange(e)}
                />
              </Form.Group>

              <Button type="submit">Add Category</Button>
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

Category.propTypes = {
  getCategory: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category.category,
});

export default connect(mapStateToProps, {
  getCategory,
  addCategory,
  editCategory,
})(Category);
