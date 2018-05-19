import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'editors.insert': function() {
    return Editors.insert({
      createdAt: new Date(),
      content: '',
      sharedWith: [],
      ownerId: this.userId
    });
  },

  'editors.remove': function(editor) {
    return Editors.remove(editor);
  },

  'editors.update': function(editor, content) {
    return Editors.update(editor._id, { $set: { content } });
  },

  'editors.share': function(editor, email) {
    return Editors.update(editor._id, { $push: { sharedWith: email } });
  }
});

export const Editors = new Mongo.Collection('editors');
