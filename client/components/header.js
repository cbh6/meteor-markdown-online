import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';
import Accounts from './accounts';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'home' };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  onLogout = e => {
    e.preventDefault();
    Meteor.logout(() => {
      this.props.history.push('/login');
    });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu pointing secondary>
        <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item
          name="messages"
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="friends"
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}
        />
        {Meteor.userId() ? (
          <Menu.Menu position="right">
            <Menu.Item name="logout" active={activeItem === 'logout'} onClick={this.onLogout} />
          </Menu.Menu>
        ) : null}
        <Accounts />
      </Menu>
    );
  }
}

export default withRouter(Header);
