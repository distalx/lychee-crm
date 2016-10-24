import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  process.env.MAIL_URL = Meteor.settings.private.mailgun.SMTP;
  Accounts.emailTemplates.siteName = Meteor.settings.public.app.name;
  Accounts.emailTemplates.from     = Meteor.settings.public.app.email;

  if(Meteor.users.find().count()===0){

    var id = Accounts.createUser({ username : 'admin', password : 'lychee123' });

    if(id){
      Roles.addUsersToRoles(id, 'admin');
    }
  }


});
