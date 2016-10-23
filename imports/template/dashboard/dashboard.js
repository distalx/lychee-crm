import './dashboard.html';
import { ReactiveMethod } from 'meteor/simple:reactive-method';

Template.dashboard.helpers({
  unreadOrdersCount:function(){
    return ReactiveMethod.call('unreadOrdersCount');
  }
});
