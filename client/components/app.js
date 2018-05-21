import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Header from './header';

const App = props => (
  <div>
    <Header />
    <Segment basic>{props.children}</Segment>
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
