import React from 'react';
import Header from './header';
import 'semantic-ui-css/semantic.min.css';

export default (props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};
