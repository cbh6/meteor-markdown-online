import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Message, Label, Icon, Header } from 'semantic-ui-react';

class EditorsShare extends Component {
  constructor(props) {
    super(props);
    this.state = { shareEmail: '', error: '' };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { shareEmail } = this.state;

    if (!shareEmail) {
      this.setState({ error: 'Email is required' });
      return;
    }
    this.setState({ error: '' });

    Meteor.call('editors.share', this.props.editor, shareEmail, (error, res) => {
      if (res) {
        Bert.alert(`Editor shared with ${this.state.shareEmail}`, 'success', 'growl-top-right');
        this.setState({ shareEmail: '' });
      }
    });
  };

  renderSharedList() {
    return (
      <Label.Group>
        {this.props.editor.sharedWith.map(email => (
          <Label as="a" key={email} className="shared-with-label">
            <Icon name="user" />
            {email}
          </Label>
        ))}
      </Label.Group>
    );
  }

  render() {
    return (
      <div>
        <Message hidden={!this.state.error} color="red">
          {this.state.error}
        </Message>
        <Header as="h2">
          Shared with
          <Form className="shared-with-form">
            <Form.Group>
              <Form.Input
                onChange={this.handleChange}
                name="shareEmail"
                value={this.state.shareEmail}
                required
                type="email"
                placeholder="Email*"
              />
              <Form.Button color="blue" onClick={this.handleSubmit} type="submit">
                Share editor
              </Form.Button>
            </Form.Group>
          </Form>
        </Header>
        {this.props.editor.sharedWith ? this.renderSharedList() : null}
      </div>
    );
  }
}

EditorsShare.propTypes = {
  editor: PropTypes.object.isRequired,
};

export default EditorsShare;
