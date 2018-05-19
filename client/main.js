import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Redirect, Switch } from 'react-router-dom';

import App from './components/app';
import Login from './components/login';
import NewAccount from './components/new_account';
import EditorsList from './components/editors/editors_list';

const history = createHistory();

const routes = (
  <Router history={history}>
    <App>
      <Switch>
        <Route
        exact
          path="/"
          render={() => (Meteor.userId() ? <EditorsList /> : <Redirect to="/login" />)}
        />
        <Route exact path="/login" render={() => (Meteor.userId() ? <EditorsList /> : <Login />)} />
        <Route exact path="/new-account" render={() => (Meteor.userId() ? <EditorsList /> : <NewAccount />)} />
      </Switch>
    </App>
  </Router>
);

Meteor.startup(() => {
  render(routes, document.querySelector('.react-root'));
});
