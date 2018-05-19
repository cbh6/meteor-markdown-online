import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Form, Message } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '' };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleSubmit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, err => {
      err ? this.setState({ error: err.reason }) : this.props.history.push('/');
    });
  };

  onTestUser = () => {
    Meteor.loginWithPassword('test@test.com', '123456', err => {
      err ? this.setState({ error: err.reason }) : this.props.history.push('/');
    });
  }

  render() {
    return (
      <div>
        <Message hidden={!this.state.error} color="red">
          {this.state.error}
        </Message>
        <Form>
          <Form.Input
            onChange={this.handleChange}
            name="email"
            fluid
            required
            label="Email"
            type="Email"
            placeholder="Email"
          />
          <Form.Input
            onChange={this.handleChange}
            name="password"
            fluid
            required
            label="Password"
            type="Password"
            placeholder="Password"
          />
          <Button onClick={this.handleSubmit} type="submit">
            Login
          </Button>
        </Form>
        New to Markdown Online? <Link to="/new-account">Create an account</Link>
        If you don't want to register. <a onClick={this.onTestUser}>Enter with test user</a>
      </div>
    );
  }
}

export default withRouter(Login);
