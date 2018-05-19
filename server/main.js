import { Meteor } from 'meteor/meteor';
import { Editors } from '../imports/collections/editors';

Meteor.startup(() => {
  Meteor.publish('editors', function() {
    return Editors.find({ ownerId: this.userId });
  });

  Meteor.publish('sharedEditors', function() {
    const user = Meteor.users.findOne(this.userId);

    if (!user) {
      return;
    }

    const email = user.emails[0].address;

    return Editors.find({
      sharedWith: { $elemMatch: { $eq: email } }
    });
  });
});
