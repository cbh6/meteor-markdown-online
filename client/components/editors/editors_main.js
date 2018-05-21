import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Container, Grid, Loader } from 'semantic-ui-react';
import Editors from '../../../imports/collections/editors';
import EditorsEditor from './editors_editor';
import EditorsViewer from './editors_viewer';

const EditorsMain = (props) => {
  if (!props.editor) {
    return <Loader active inline="centered" />;
  }
  return (
    <Container>
      <Grid columns="2">
        <Grid.Column>
          <EditorsEditor editor={props.editor} />
        </Grid.Column>
        <Grid.Column>
          {/* <EditorsViewer editor={props.editor} /> */}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

EditorsMain.propTypes = {
  editor: PropTypes.object,
};

EditorsMain.defaultProps = {
  editor: {},
};

export default withTracker((props) => {
  const { editorId } = props.match.params;
  Meteor.subscribe('editors');
  Meteor.subscribe('sharedEditors');
  return { editor: Editors.findOne(editorId) };
})(EditorsMain);
