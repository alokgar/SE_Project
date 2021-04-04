import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Approve_status from '../approve_status/approve_status'
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Sidebar1 from '../sidebar/sidebar';
import { Row , Button, Col , Container } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'



const Dashboard = ({
  getCurrentProfile,

  deleteAccount,
  auth: { user },

  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();

  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    
    <div className="row" style={{height:'100%'}}>
      <Sidebar1/>
      <div className="col-md-10 mainContainer ScrollDiv" >
      <h1 className='large text-primary'>Dashboard</h1>
      {/* <Link to="/sizes"> Sizes Page </Link> */}
      <Row style={{justifyContent:'space-evenly'}}>
        <Col xs={3}>
          <Card >
            <Card.Body>
              <Card.Title>Sale</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={3}>
          <Card >
            <Card.Body>
              <Card.Title>Sale</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={3}>
          <Card >
            <Card.Body>
              <Card.Title>Sale</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          {profile !== null ? (
            <Fragment>
              <div className='my-2'>
                <button className='btn btn-danger' onClick={() => deleteAccount()}>
                  <i className='fas fa-user-minus' /> Delete My Account
                </button>
              </div>
            </Fragment>
          ) 
          : 
          (
            <div>
              <Card style={{
                height: '300px',
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                border:'solid ipx var(--dark-color)' }}
              >
                <Card.Header className="bg-dark">
                  <b>Pending Queries</b>
                  <Button variant="primary" size="sm" style={{float:'right',fontSize:'12px'}}>See All</Button>
                </Card.Header>
                <Approve_status/>
              </Card>
            </div>
          )}
        </Col>
        <Col>
          <Card style={{
                  height: '300px',
                  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                  border:'solid ipx var(--dark-color)' }}
                >
                  <Card.Header className="bg-dark">
                    <b>Pending Queries</b>
                    <Button variant="primary" size="sm" style={{float:'right',fontSize:'12px'}}>See All</Button>
                  </Card.Header>
                  
                </Card>
          </Col>
      </Row>
      
          
    </div>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,

  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
 
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile

});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);