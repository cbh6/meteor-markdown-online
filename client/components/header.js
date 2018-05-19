import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';
import Accounts from './accounts';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'home' };
  }

  onLogout = e => {
    e.preventDefault();
    Meteor.logout(() => {
      this.props.history.push('/login');
    });
  };

  onLogin = e => {
    this.props.history.push('/login');
  }

  render() {
    const { activeItem } = this.state;
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
};

Header.defaultProps = {
  user: {},
};

export default withTracker(() => ({
  user: Meteor.user(),
}))(withRouter(Header));