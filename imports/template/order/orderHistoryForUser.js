import './orderHistoryForUser.html';


Template.orderHistoryForUser.onCreated(function() {
  this.subscribe('orderHistoryForUser');
});

Template.orderHistoryForUser.helpers({
  orders : function(){
    return Orders.find();
  }
});
