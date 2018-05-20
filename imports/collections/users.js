Meteor.methods({
  'users.getUserById': function(id) {
    return Meteor.users.findOne({_id : id});
  },
});

export const Users = Meteor.users;
