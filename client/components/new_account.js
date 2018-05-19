import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Message, Header, Grid, Segment, Divider } from 'semantic-ui-react';
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
      <Grid centered columns={1}>
        <Grid.Column className="centered-form">
          <Message hidden={!this.state.error} color="red">
            {this.state.error}
          </Message>
          <Header textAlign="center" as="h3">
            Create new account
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
                Create account
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(NewAccount);
