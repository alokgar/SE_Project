import React, { Fragment, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner";
import { Row, Button, Col, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";

export const Datacard = ({ title, subtitle, link, color }) => {
  return (
    <Card style={{ backgroundColor: `${color}`, color: "white" }}>
      <Card.Body>
        <Card.Title>
          {title}
          <div style={{ float: "right" }}></div>
        </Card.Title>
        <Card.Link
          href={link}
          style={{ float: "right", color: "white", paddingTop: "15px" }}
        >
          View
        </Card.Link>
        <div style={{ fontSize: "30px" }}>{subtitle}</div>
      </Card.Body>
    </Card>
  );
};

export const Tablecard = ({ title, link, table }) => {
  return (
    <Card
      style={{
        height: "300px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        border: "solid ipx var(--dark-color)",
        overflow: "auto",
      }}
    >
      <Card.Header className="bg-dark">
        <b>{title}</b>
        <Button
          variant="primary"
          size="sm"
          style={{ float: "right", fontSize: "12px" }}
          onClick={() => {
            <Redirect to={link} />;
          }}
        >
          See All
        </Button>
      </Card.Header>
      {!table ? (
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
        table
      )}
    </Card>
  );
};
