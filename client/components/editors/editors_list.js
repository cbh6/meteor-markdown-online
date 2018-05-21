import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Header, List, Form, Container, Message } from 'semantic-ui-react';
import EditorsListItem from './editors_list_item';
import Editors from '../../../imports/collections/editors';

class EditorsList extends Component {
  constructor(props) {
    super(props);
    this.state = { editorTitle: '', error: '' };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
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

  renderListItems() {
    return this.props.editors.map((editor) => {
      const url = `/editors/${editor._id}`;
      return <EditorsListItem key={editor._id} url={url} editor={editor} />;
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

EditorsList.propTypes = {
  editors: PropTypes.array,
};

EditorsList.defaultProps = {
  editors: [],
};

export default withTracker(() => {
  Meteor.subscribe('editors');
  Meteor.subscribe('sharedEditors');

  return { editors: Editors.find({}).fetch() };
})(EditorsList);
