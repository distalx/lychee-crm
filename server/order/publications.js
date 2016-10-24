Meteor.publish("orderHistoryForUser", function(){
  return Orders.find( { 'userId' : this.userId }, {sort: { 'created_at' : -1}} );
});

Meteor.publish("orderHistoryForOwner", function(){
  if (Roles.userIsInRole(this.userId, ["admin","moderator"])) {
    return Orders.find( {}, {sort: { 'created_at' : -1}} );
  }
  this.ready();

});
