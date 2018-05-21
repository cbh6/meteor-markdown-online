import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/markdown/markdown.js';

class EditorsEditor extends Component {
  onEditorChange = (content) => {
    Meteor.call('editors.update', this.props.editor, content);
  };

  render() {
    return (
      <div>
        <Header as="h2">Input</Header>
        <CodeMirror
          value={this.props.editor.content}
          onChange={(editor, data, value) => {
            this.onEditorChange(value);
          }}
          options={{ mode: 'markdown', lineNumbers: true, theme: 'material' }}
        />
      </div>
    );
  }
}

EditorsEditor.propTypes = {
  editor: PropTypes.object.isRequired,
};

export default EditorsEditor;
