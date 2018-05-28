import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, List, Icon } from 'semantic-ui-react';
import Moment from 'react-moment';

class EditorsListItem extends Component {
  onEditorRemove(editor) {
    Meteor.call('editors.remove', editor, (err) => {
      if (!err) {
        Bert.alert('Editor successfuly deleted!', 'success', 'growl-top-right');
      }
    });
  }

  render() {
    const { editor, url } = this.props;

    return (
      <List.Item key={editor._id}>
        <List.Content floated="right">
          <Button icon color="red" onClick={() => this.onEditorRemove(editor)}>
            <Icon size="large" name="trash" />
          </Button>
        </List.Content>
        <List.Icon name="file text" size="large" verticalAlign="middle" />
        <List.Content>
          <List.Header as={Link} to={url}>
            {editor.title}
          </List.Header>
          <List.Description as="a">
            Created at <Moment format="DD/MM/YYYY">{editor.createdAt.getTime()}</Moment> by{' '}
            {editor.ownerEmail}
          </List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

EditorsListItem.propTypes = {
  editor: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export default EditorsListItem;
