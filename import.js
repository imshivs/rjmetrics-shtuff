var rjmetrics = require("rjmetrics");
var client = new rjmetrics.Client(0, "RJ_METRICS_IMPORT_KEY");

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
// // ];

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

var http = require('http');
var request = require('request');
var url = require('url');

//single data point
var data = [{
  "keys": ["id"],
  "id": 1,
  "email": "joe@schmo.com",
  "status": "pending",
  "created_at": "2012-08-01 14:22:32"
},{
  "keys": ["id"],
  "id": 2,
  "email": "anne@schmo.com",
  "status": "pending",
  "created_at": "2012-08-03 23:12:30"
},{
  "keys": ["id"],
  "id": 1,
  "email": "joe@schmo.com",
  "status": "complete",
  "created_at": "2012-08-05 04:51:02"
}]


var username = "shivani@npmjs.com",
    password = "AgeQuodAgis@5",
    exportApi = 'https://connect.rjmetrics.com/v2/client/:cid/table/:table/data?apikey=:apikey',
    auth = process.env.RJ_METRICS_EXPORT_KEY;

request(
    {
        url : exportApi + '/export',
        headers : {
            "X-RJM-API-Key" : auth
        }
    },
    function (error, response, body) {
      console.log(response.statusCode);
      console.log(body);
    }
);