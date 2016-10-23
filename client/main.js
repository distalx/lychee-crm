import '/imports/startup/client';
import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import moment from 'moment';

Meteor.startup(function () {
  TAPi18n.setLanguage('en')
    .done(function () {
      // console.log("success");
    })
    .fail(function (error_message) {
      // console.log(error_message);
    });
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    forceUsernameLowercase: true,
    forcePasswordLowercase: true
});

Template.registerHelper('cleanDateFormatCalendar', function(date) {
  return moment(date).calendar();
});

Template.registerHelper("appName", function(){
  return Meteor.settings.public.app.name;
});
