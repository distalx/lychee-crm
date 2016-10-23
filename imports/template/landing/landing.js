import './landing.html';
// import {Stripe} from 'stripe';

Template.landing.onCreated(function() {
  let template = Template.instance();

  // console.log("stripe", Stripe);

  template.selectedService  = new ReactiveVar( false );
  template.processing = new ReactiveVar( false );

  template.checkout = StripeCheckout.configure({
    key: Meteor.settings.public.stripe.publicKey,
    locale: 'auto',
    token( token ) {
      let service = template.selectedService.get(),
         charge  = {
           amount: token.amount || service.amount,
           currency: token.currency || 'usd',
           source: token.id,
           description: token.description || service.description,
           receipt_email: token.email
         };

     Meteor.call( 'processPayment', charge, ( error, response ) => {
       if ( error ) {
         template.processing.set( false );
         Bert.alert( error.reason, 'danger' );
       } else {
         Bert.alert( 'Thanks! Please check your email. :)', 'success' );
       }
     });
   },
   closed() {
      template.processing.set( false );
   }

  });
});

Template.landing.helpers({
  processing() {
    return Template.instance().processing.get();
  }
});


Template.landing.events({
  'click [data-service]' ( event, template ) {
    const pricing = {
      'silver-pack': {
        amount: 1000,
        description: "Silver Pack"
      },
      'gold-pack': {
        amount: 2000,
        description: "Gold Pack"
      },
      'platinum-pack': {
        amount: 3000,
        description: "Platinum Pack"
      }
    };

    let service = pricing[ event.target.dataset.service ];

    template.selectedService.set( service );
    template.processing.set( true );

    template.checkout.open({
      name: Meteor.settings.public.app.name,
      description: service.description,
      amount: service.amount,
      bitcoin: false
    });
  }
});
