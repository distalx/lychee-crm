"use strict"

import './is_loggedin.html';
import './unauthorised.html';
import { Meteor } from 'meteor/meteor';


Template.isLoggedin.helpers({
  target: function () {
    var loggedInUserId = Meteor.userId()

    if (!loggedInUserId) {
      return 'unauthorised'
    } else {
      return this.targetTemplate
    }
  }
})
