import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import { getCurrentProfile, deleteAccount } from '../../actions/profile';

import { getUsers } from '../../actions/status';

const Dashboard = ({
  getCurrentProfile,
  getUsers,
  deleteAccount,
  auth: { user },
  status:{users},
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
    getUsers();
  }, [getCurrentProfile,getUsers]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    
    <Fragment>
       
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.first_name}
      </p>
      {profile !== null ? (
        <Fragment>
          {/* <DashboardActions /> */}
          {/* <Experience experience={profile.experience} />
          <Education education={profile.education} /> */}

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {/* <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link> */}

          {/* {getUsers[0]} */}
          {/* {status} */}

          Following are the list of USERS with there status
          {users.map(user => <div>{user.first_name}{  user.first_name}{  user.status}</div>)}

          
        </Fragment>
      )}
      
          
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  status: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  status: state.status
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount ,getUsers }
)(Dashboard);