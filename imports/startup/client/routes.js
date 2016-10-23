//packages
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';


//all the template
import '../../template';


FlowRouter.notFound = {

    action: function() {
      BlazeLayout.render('layout', { main: 'notFound' });
    }
};



FlowRouter.route('/', {
  name: 'landing',
  action() {
    BlazeLayout.render('layout', { main: 'landing' });
  },
});

FlowRouter.route('/about', {
  name: 'about',
  action() {
    BlazeLayout.render('layout', { main: 'about' });
  },
});

FlowRouter.route('/account', {
  name: 'account',
  action() {
    BlazeLayout.render('layout', {  main: 'isLoggedin', targetTemplate: 'account' });
  },
});

FlowRouter.route('/enroll-account/:token', {
  name: 'enroll account',
  action(params, queryParams) {
    console.log("token", params.tocken);

    Accounts.onEmailVerificationLink(params.token, function(err){
      if(err){
        alert(err)
      }else{
        FlowRouter.go('/')
      }
    })
    // BlazeLayout.render('layout', { main: 'landing' });
  },
});
FlowRouter.route('/verify-email/:token',{
  action: function(params){
    Accounts.verifyEmail(params.token, function(error){
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        FlowRouter.go('/');
        Bert.alert('Email verified! Thanks!', 'success');
      }
    });
  }
})


FlowRouter.route('/simple/dashboard/', {
  name: 'dashboard',
  action() {
    BlazeLayout.render('layout', { main: 'isModerator', targetTemplate: 'dashboard' });
  },
});

FlowRouter.route('/simple/orders/', {
  name: 'orders',
  action() {
    BlazeLayout.render('layout', { main: 'isModerator', targetTemplate: 'orderHistoryForOwner' });
  },
});
