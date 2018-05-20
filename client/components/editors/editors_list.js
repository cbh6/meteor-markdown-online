import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Header, List, Form, Container, Message, Icon } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Editors } from '../../../imports/collections/editors';
import { Link } from 'react-router';

class EditorsList extends Component {
  constructor(props) {
    super(props);
    this.state = { editorTitle: '', error: '' };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { editorTitle } = this.state;

    if (!editorTitle) {
      this.setState({ error: 'Editor title is required' });
      return;
    }
    this.setState({ error: '' });

    Meteor.call('editors.insert', editorTitle, (error, res) => {
      if (res) {
        this.setState({ editorTitle: '' });
      }
    });
  };

  onEditorRemove(editor) {
    Meteor.call('editors.remove', editor);
  }

  getUser(id) {
    const user = Meteor.users.findOne({ _id: id });

    if (user.emails && user.emails[0]) {
      return user.emails[0].address;
    }
  }

  renderListItems() {
    return this.props.editors.map(editor => {
      const url = `/editors/${editor._id}`;
      return (
        <List.Item key={editor._id}>
          <List.Content floated="right">
            <Button icon color="red" onClick={() => this.onEditorRemove(editor)}>
              <Icon size="large" name="trash" />
            </Button>
          </List.Content>
          <List.Icon name="file text" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header as="a">{editor.title}</List.Header>
            <List.Description as="a">
              Created at <Moment format="DD/MM/YYYY">{editor.createdAt.getTime()}</Moment> by{' '}
              {this.getUser(editor.ownerId)}
            </List.Description>
          </List.Content>
        </List.Item>
      );
    });
  }

  render() {
    return (
      <Container>
        <Header as="h2">Editors List</Header>
        <Message hidden={!this.state.error} color="red">
          {this.state.error}
        </Message>
        <Form>
          <Form.Group>
            <Form.Input
              onChange={this.handleChange}
              name="editorTitle"
              value={this.state.editorTitle}
              required
              type="text"
              placeholder="Editor Title*"
            />
            <Form.Button color="blue" onClick={this.handleSubmit} type="submit">
              Create new editor
            </Form.Button>
          </Form.Group>
        </Form>
        <br />
        <br />
        <List divided relaxed verticalAlign="middle">
          {this.renderListItems()}
        </List>
      </Container>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('editors');
  Meteor.subscribe('sharedEditors');

  return { editors: Editors.find({}).fetch() };
})(EditorsList);
