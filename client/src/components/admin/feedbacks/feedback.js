import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getFeedbacks,
  addFeedback,
  editFeedback,
  deleteFeedback,
} from "../../../actions/feedback";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Button, Row, Col } from "react-bootstrap";
import Sidebar1 from "../sidebar/sidebar";

const Feedback = ({
  getFeedbacks,
  addFeedback,
  editFeedback,
  deleteFeedback,
  feedbacks,
}) => {
  const [showTable, setTable] = useState(true);
  const [showEdit, setEdit] = useState(false);
  const [viewId, setviewId] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    subject: "",
    content: "",
  });

  const { id, subject, content } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    getFeedbacks();
  }, [getFeedbacks]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (showEdit === false) addFeedback({ id, subject, content });
    else {
      editFeedback({ id, subject, content });
      setEdit(!showEdit);
    }

    setFormData({
      id: "",
      subject: "",
      content: "",
    });
    setTable(!showTable);
  };

  const onEditclick = (feed) => {
    setTable(false);
    setEdit(true);
    setFormData({
      id: feed._id,
      subject: feed.subject,
      content: feed.content,
    });
  };

  const onViewclick = (id) => {
    viewId === null
      ? setviewId(id)
      : viewId === id
      ? setviewId(null)
      : setviewId(id);
  };
  return feedbacks === null ? (
    <div></div>
  ) : showTable === true ? (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 link="/feedbacks" />
      <div className="col-md-10 mainContainer">
        <div className="tableDiv">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Subject</th>
                <th>#</th>
                <th>#</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(function (feedback) {
                return (
                  <Fragment>
                    <tr>
                      <td>
                        {feedback.employee_id.first_name}{" "}
                        {feedback.employee_id.last_name}
                      </td>
                      <td>{feedback.subject}</td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => onViewclick(feedback._id)}
                        >
                          View
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => onEditclick(feedback)}
                        >
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => deleteFeedback(feedback._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                    {viewId === feedback._id ? (
                      <tr>
                        <td>Content</td>
                        <td colSpan="4"> {feedback.content}</td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
        <Button onClick={() => setTable(false)}>Add Feedback</Button>
      </div>
    </div>
  ) : (
    <div className="row" style={{ height: "100%" }}>
      <Sidebar1 />
      <div className="col-md-10 mainContainer ScrollDiv">
        <Form onSubmit={(e) => onSubmit(e)}>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              name="subject"
              placeholder="Subject"
              value={subject}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              name="content"
              placeholder="Enter your feedback"
              value={content}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Button variant="primary" size="lg" type="submit">
            Submit
          </Button>
          <Button
            variant="outline-primary"
            size="lg"
            href="/feedbacks"
            style={{ float: "right", marginRight: "20px" }}
          >
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
};

Feedback.propTypes = {
  getFeedbacks: PropTypes.func.isRequired,
  addFeedback: PropTypes.func.isRequired,
  editFeedback: PropTypes.func.isRequired,
  deleteFeedback: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  feedbacks: state.feedback.feedbacks,
});

export default connect(mapStateToProps, {
  getFeedbacks,
  addFeedback,
  editFeedback,
  deleteFeedback,
})(Feedback);
