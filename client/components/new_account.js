import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Message } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

class NewAccount extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '' };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleSubmit = () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, password }, err => {
      err ? this.setState({ error: err.reason }) : this.props.history.push('/');
    });
  };

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
            Create account
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(NewAccount);
