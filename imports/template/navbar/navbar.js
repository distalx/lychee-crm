import './navbar.html';

Template.navbar.events({
  "click #logout": function(event, template){
      event.preventDefault();
      Meteor.logout();
      FlowRouter.go('landing');
  }
});
