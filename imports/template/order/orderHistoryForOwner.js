import './orderHistoryForOwner.html';


Template.orderHistoryForOwner.onCreated(function() {
  this.subscribe('orderHistoryForOwner');
});

Template.orderHistoryForOwner.helpers({
  orders : function(){
    return Orders.find();
  },
  markedAsOpen:function(){
    var userId = Meteor.userId();
    if (userId && !_.include(this.read, userId)) {
      return false;
    } else {
    return true;
    }
  }
});

Template.orderHistoryForOwner.events({
  "click .markAsRead": function(event, template){
    Meteor.call('markOrderAsRead', this._id, function(error, result) { });
  }
});
