var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var $fh = require('fh-mbaas-api');

function pushNotificationRoute() {
  var pushNotification = new express.Router();
  pushNotification.use(cors());
  pushNotification.use(bodyParser());


  // trivial GET REST endpoint
  pushNotification.get('/', function(request, response) {
    console.log(new Date(), 'About to send a Push Notification to the internal Push Server');

    // create the push notification payload:
    var message = {
      'alert': 'Hello Push Notification!',
      'sound': 'default'
    };

    var options = {
      broadcast: false, // when true, message will be send to all client apps in the project
      apps: ['btsvtf54sxfepdshrx4mpguz'] // or you can specify list of client apps to send notification to
    };

    // dispatch the payload message to the internal push server
    $fh.push(message, options, function (err, res) {
      if (err) {
        console.log('Push error:' + err.toString());
      } else {
        console.log("status from Unified Push : " + res.status);
      }
    });

    // return 202 (Accepted) to indicate that message to push server was triggered
    response.status( 202 ).json({msg: 'Message to internal Push server delivered for further processing!'});
  });

  return pushNotification;
}

module.exports = pushNotificationRoute;
