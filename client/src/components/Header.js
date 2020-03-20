import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import GoogleAuth from './GoogleAuth';

const Header = (props) => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Streams Application
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          Browse Streams
        </Link>
        {props.isSignedIn ? (
          <Link to={`/mystreams/${props.currentUserId}`} className="item">
            Your Streams
          </Link>
        ) : (
          ''
        )}
        <GoogleAuth />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps)(Header);
