#!/usr/bin/env node

require('dotenv').load();

var rjmetrics = require("rjmetrics");
var client = new rjmetrics.Client(0, process.env.RJ_METRICS_IMPORT_KEY);
var http = require('http');
var request = require('request');
var url = require('url');

// function getTestPersonaLoginCredentials(callback) {

//     return http.get({
//         host: 'https://api.rjmetrics.com',
//         path: '/0.1/export'
//     }, function(response) {
//         // Continuously update stream with data
//         var body = '';
//         response.on('data', function(d) {
//             body += d;
//         });
//         response.on('end', function() {

//             // Data reception is done, do whatever with it!
//             var parsed = JSON.parse(body);
//             console.log(parsed);
//             callback({
//                 apikey: "0607f685013a4015c3997fb294a2a5e9"
//             });
//         });
//     });


//  function getData() {
//   return client.makeApiCall({
//     "1489424", "data", "https://api.rjmetrics.com/0.1/client/12/table"
//   })
// }
// //   return client.pushData(
// //     "orders",
// //     {

// Client.prototype.makeApiCall = function(tableName, data, baseUrl) {
//   if(baseUrl === undefined)
//     baseUrl = Client.API_BASE;

//   var fullUrl = baseUrl + "/client/" + this.clientId +
//     "/table/" + tableName + "/data?apikey=" + this.apiKey;

//   var deferred = Q.defer();

//   needle.post(
//     fullUrl,
//     data,
//     {
//       json: true
//     },
//     function(error, response, body) {
//       if(error)
//         deferred.reject(error);
//       else
//         deferred.resolve({
//           body: JSON.parse(body.toString()),
//           code: response.statusCode
//         });
//     }
//   )

//   return deferred.promise;
// }

var username = "shivani@npmjs.com",
    password = "AgeQuodAgis@5",
    exportApi = 'https://api.rjmetrics.com/0.1',
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
