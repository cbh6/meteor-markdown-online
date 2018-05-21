const Users = Meteor.users;

Meteor.methods({
  'users.getUserById': function (id) {
    check(id, String);
    return Meteor.users.findOne({ _id: id });
  },
});

export default Users;
