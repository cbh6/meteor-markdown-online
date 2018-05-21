import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import marked from 'marked';

const EditorsViewer = (props) => {
  const rawHTML = props.editor.content ? marked(props.editor.content) : '';
  return (
    <div>
      <Header as="h2">Output</Header>
      <div dangerouslySetInnerHTML={{ __html: rawHTML }} />
    </div>
  );
};

EditorsViewer.propTypes = {
  editor: PropTypes.object.isRequired,
};

export default EditorsViewer;
