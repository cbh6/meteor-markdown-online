import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Form, Message, Header, Grid, Segment, Divider } from 'semantic-ui-react';
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
  };

  render() {
    return (
      <Grid centered columns={1}>
        <Grid.Column className="centered-form">
          <Message hidden={!this.state.error} color="red">
            {this.state.error}
          </Message>
          <Header textAlign="center" as="h3">
            Login to Markdown Online
          </Header>
          <Segment stacked>
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
              <Button fluid color="blue" onClick={this.handleSubmit} type="submit">
                Login
              </Button>
            </Form>
          </Segment>
          New to Markdown Online? <Link to="/new-account">Create an account</Link> or{' '}
          <a onClick={this.onTestUser}>enter with test user</a>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(Login);
