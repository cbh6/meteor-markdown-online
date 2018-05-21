import { Mongo } from 'meteor/mongo';

const Editors = new Mongo.Collection('editors');

Meteor.methods({
  'editors.insert': function (title) {
    check(title, String);
    return Editors.insert({
      title,
      createdAt: new Date(),
      content: '',
      sharedWith: [],
      ownerId: this.userId,
      ownerEmail: Meteor.user().emails[0].address,
    });
  },

  'editors.remove': function (editor) {
    check(editor, Object);
    return Editors.remove(editor);
  },

  'editors.update': function (editor, content) {
    check(editor, Object);
    check(content, String);
    return Editors.update(editor._id, { $set: { content } });
  },

  'editors.share': function (editor, email) {
    check(editor, Object);
    check(email, String);
    return Editors.update(editor._id, { $push: { sharedWith: email } });
  },
});

export default Editors;
