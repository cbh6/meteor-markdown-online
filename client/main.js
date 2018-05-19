import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Redirect, Switch } from 'react-router-dom';

import App from './components/app';
import Login from './components/login';
import NewAccount from './components/new_account';

const history = createHistory();

const routes = (
  <Router history={history}>
    <App>
      <Switch>
        <Route
        exact
          path="/"
          render={() => (Meteor.userId() ? <div><br /><br /><h1>Hola</h1></div> : <Redirect to="/login" />)}
        />
        <Route exact path="/login" render={() => (Meteor.userId() ? <div><br /><br /><h1>Hola</h1></div> : <Login />)} />
        <Route exact path="/new-account" render={() => (Meteor.userId() ? <NewAccount /> : <NewAccount />)} />
      </Switch>
    </App>
  </Router>
);

Meteor.startup(() => {
  render(routes, document.querySelector('.react-root'));
});
