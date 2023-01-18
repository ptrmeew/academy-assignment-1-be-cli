# IOS Subscriptions

This template includes entities and edge functions to handle ios subscriptions. These entities are documented with comments in their respective files. 

To work with ios subscriptions you must have an apple developer account. Once your apple developer account is set up, navigate to your app on app store connect and look for the "subscriptions" menu to the left. Follow the instructions there to create new subscriptions.

An important note is that once you have created a subscription, you cannot create a new subscription with the same product id, even if you delete it, so if you decide to create a test subscription, do not use product ids that should be used for production.

## Listening to notifications

When a user manages their ios subscription, or it changes in any way, a notification is sent. Under the menu "App information" you must specify a url for sandbox notification and production notifications, that must point to deployed "ios-notifications" supsabase edge function so that subscriptions can be updated accordingly. The edge functions can be found in MeeWs [edge-functions-cli-template](https://github.com/meewworld/edge-functions-cli-template) github repository