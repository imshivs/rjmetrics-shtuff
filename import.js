
require('dotenv').load();
var rjmetrics = require("rjmetrics");
var client = new rjmetrics.Client(3986, process.env.RJ_METRICS_IMPORT_KEY);
var hubspot = require("./hubspot.js");

hubspot(function (to_push) {
  client.authenticate().then(function(data) {
    console.log("here");
      console.log(to_push);
      client.pushData(to_push);
    }).then(function (data) {
      console.log("saved:", data);
    }).fail(function(err) {
      console.log("Error", err, "saving.");
    })
})



// function syncUser(client, user) {
//   return client.pushData(
//     // table named "users"
//     "users",
//     {
//       // user_id is the unique key here, since each user should only
//       // have one record in this table
//       "keys": ["id"],
//       "id": user.id,
//       "email": user.email,
//       "acquisition_source": user.acquisition_source
//     });
// }

// // let's define some fake users
// var users = [
//   {id: 1, email: "joe@schmo.com", acquisition_source: "PPC"},
//   {id: 2, email: "mike@smith.com", acquisition_source: "PPC"},
//   {id: 3, email: "lorem@ipsum.com", acquisition_source: "Referral"},
//   {id: 4, email: "george@vandelay.com", acquisition_source: "Organic"},
//   {id: 5, email: "larry@google.com", acquisition_source: "Organic"},
// ];

// // make sure the client is authenticated before we do anything
// client.authenticate().then( function(data) {

//   users.forEach( function(user) {
//     syncUser(client, user).then( function(data) {
//       console.log("Synced user with id " + user.id);
//     }, function(error) {
//       console.error("Failed to sync user with id " + user.id);
//     })
//   });

// }).fail(function(err) {
//   console.error("Failed to authenticate!");
// });

// function syncOrder(client, order) {
//   return client.pushData(
//     "orders",
//     {
//       "keys": ["id"],
//       "id": order.id,
//       "user_id": order.user_id,
//       "value": order.value,
//       "sku": order.sku
//     });
// }

// var orders = [
//   {"id": 1, "user_id": 1, "value": 58.40,  "sku": "milky-white-suede-shoes"},
//   {"id": 2, "user_id": 1, "value": 23.99,  "sku": "red-button-down-fleece"},
//   {"id": 3, "user_id": 2, "value": 5.00,   "sku": "bottle-o-bubbles"},
//   {"id": 4, "user_id": 3, "value": 120.01, "sku": "zebra-striped-game-boy"},
//   {"id": 5, "user_id": 5, "value": 9.90  , "sku": "kitten-mittons"}
// ];

// client.authenticate().then( function(data) {

//   orders.forEach( function(order) {
//     syncOrder(client, order).then( function(data) {
//       console.log("Synced order with id " + order.id);
//     }, function(error) {
//       console.error("Failed to sync order with id " + order.id);
//     })
//   });

// }).fail(function(err) {
//   console.error("Failed to authenticate!");
// });
