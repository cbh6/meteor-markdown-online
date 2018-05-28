import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form, Message, Header, Grid, Segment, Image } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

class NewAccount extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '' };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleSubmit = () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
        return;
      }
      Bert.alert('Account created. Logged in', 'success', 'growl-top-right');
      this.props.history.push('/');
    });
  };

  render() {
    return (
      <Grid centered columns={1}>
        <Grid.Column className="centered-form">
          <Image src="/images/markdown.png" size="tiny" centered />
          <Header textAlign="center" as="h3">
            Create new account
          </Header>
          <Segment className="centered-segment">
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
              <Button fluid color="blue" onClick={this.handleSubmit} type="submit">
                Create account
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

NewAccount.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NewAccount);
