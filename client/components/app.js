import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Header from './header';

class App extends Component {
  gradientBackground() {
    return this.props.location.pathname === '/login' || this.props.location.pathname === '/new-account';
  }

  render() {
    return (
      <div className={this.gradientBackground() ? 'gradient' : null}>
        {Meteor.userId() ? <Header /> : null}
        <Segment basic>{this.props.children}</Segment>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(App);
