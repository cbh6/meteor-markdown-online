import React from 'react';
import { Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Header from './header';

export default (props) => {
  return (
    <div>
      <Header />
      <Segment basic>
        {props.children}
      </Segment>
    </div>
  );
};
