SSR.compileTemplate('subscriptionReceipt', Assets.getText('subscription-receipt.html'));
SSR.compileTemplate('welcome', Assets.getText('welcome.html'));


let Stripe = StripeAPI( Meteor.settings.private.stripe.privateKey );

Meteor.methods({
  processPayment( charge ) {
    check( charge, {
      amount: Number,
      currency: String,
      source: String,
      description: String,
      receipt_email: String
    });

    let handleCharge = Meteor.wrapAsync( Stripe.charges.create, Stripe.charges ),
        payment      = handleCharge( charge );
        // console.log("payment",payment);



        let order = {
          email: payment.receipt_email,
          amount: payment.amount / 100,
          package: payment.description,
          paymentId: payment.id,
          read: [],
          createdAt: new Date()
        }

        //create new account


        if (Accounts.findUserByEmail(payment.receipt_email) ) {
          console.log("message",Accounts.findUserByEmail(order.email));
          let user = Accounts.findUserByEmail(order.email);

          order.userId = user._id;
          order.type = "email_mismatch"
          order.id = Orders.insert(order);



        }else {
          //new account
          order.userId = Accounts.createUser({email:order.email});

          order.type = "success";
          //order
          order.id = Orders.insert(order);
          //send welcome email
          Accounts.sendEnrollmentEmail(order.userId, order.email);

          //sent welcome email
          Email.send({
            to: payment.receipt_email,
            from: Meteor.settings.public.app.email,
            subject: "Ready to get started!?",
            html: SSR.render('welcome'),

          });


        }

        //sent order email
        let subscriptionReceiptData = {
          orderId: order.id,
          amount: payment.amount / 100,
          package: payment.description,
        };

        Email.send({
          to: payment.receipt_email,
          from: Meteor.settings.public.app.email,
          subject: Meteor.settings.public.app.name + "["+ payment.description +" subscription] receipt",
          html: SSR.render('subscriptionReceipt', subscriptionReceiptData),

        });

    return payment;
  }
});



Meteor.methods({
  unreadOrdersCount:function(){
     return Orders.find({'read':{$ne:this.userId}}).count();
  }
});

Meteor.methods({
  markOrderAsRead:function(orderId){

    Orders.update({ _id: orderId },
                  {$push: { read: this.userId } });

  },
});
