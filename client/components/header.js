import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class Header extends Component {
  onLogout = (e) => {
    e.preventDefault();
    Meteor.logout(() => {
      this.props.history.push('/login');
    });
  };

  onLogin = () => {
    this.props.history.push('/login');
  };

  render() {
    const { user } = this.props;

    return (
      <Menu>
        <Menu.Item header>Markdown Online</Menu.Item>
        {Meteor.userId() ? (
          <Menu.Menu position="right">
            <Menu.Item name="logout" onClick={this.onLogout} />
            <Menu.Item>{user && user.emails ? user.emails[0].address : null}</Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item name="login" as={Link} to="/login" onClick={this.onLogin} />
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object.isRequired,
};

Header.defaultProps = {
  user: {},
};

export default withTracker(() => ({
  user: Meteor.user(),
}))(withRouter(Header));
