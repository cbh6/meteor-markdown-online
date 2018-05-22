import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form, Message, Header, Grid, Segment, Item } from 'semantic-ui-react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '' };
  }

  onTestUser = () => {
    Meteor.loginWithPassword('test@test.com', '123456', (err) => {
      err ? this.setState({ error: err.reason }) : this.props.history.push('/');
    });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      err ? this.setState({ error: err.reason }) : this.props.history.push('/');
    });
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    return (
      <Grid centered columns={1} className="login-page">
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
          <Item as="a" onClick={this.onTestUser}>
            enter with test user
          </Item>
        </Grid.Column>
      </Grid>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Login);
