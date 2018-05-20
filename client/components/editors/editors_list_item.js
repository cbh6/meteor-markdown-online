import React, { Component } from 'react';
import { Button, List, Icon } from 'semantic-ui-react';
import Moment from 'react-moment';


class EditorsListItem extends Component {
  onEditorRemove(editor) {
    Meteor.call('editors.remove', editor);
  }

  getUser(id) {
    const user = Meteor.users.findOne({ _id: id });

    if (user.emails && user.emails[0]) {
      return user.emails[0].address;
    }
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
          <List.Header as="a">{editor.title}</List.Header>
          <List.Description as="a">
            Created at <Moment format="DD/MM/YYYY">{editor.createdAt.getTime()}</Moment> by{' '}
            {this.getUser(editor.ownerId)}
          </List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

export default EditorsListItem;
