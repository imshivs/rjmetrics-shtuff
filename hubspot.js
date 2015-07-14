// require('dotenv').load();
// var hubspotAPI = require('hubspot');

// var token = process.env.HUBSPOT_API_KEY;

// try {
//     var api = hubspotAPI({
//       token: token,
//       version : 'v3'
//     });
// } catch (error) {
//     console.log(error.message); // the options are missing, this function throws an error.
// }

// api.sources({ user_id: 419727 }, function (error, data) {
//     if (error)
//         console.log(error.message);
//     else
//         console.log(JSON.stringify(data)); // Do something with your data!
// });

require('dotenv').load();
var request = require('request');

// var hubspotAPI = require('hubspot');

// var token = process.env.HUBSPOT_API_KEY;

// try {
//     var api = hubspotAPI({
//       token: token,
//       version : 'v3'
//     });
// } catch (error) {
//     console.log(error.message); // the options are missing, this function throws an error.
// }

// api.sources_daily({ user_id: 419727 }, function (error, data) {
//     if (error)
//         console.log(error.message);
//     else
//         console.log(JSON.stringify(data)); // Do something with your data!
// });


uri ="http://api.hubapi.com/email/public/v1/subscriptions/jerry@example.org?hapikey=demo"





var username = "shivani@npmjs.com",
    password = "AgeQuodAgis@5",
    email = 'http://api.hubapi.com/email/public/v1/campaigns/by-id?hapikey=',
    auth = process.env.HUBSPOT_API_KEY;
console.log(auth);
request(
    {
        url : email + auth + "&limit=5",
        headers : {
            "X-RJM-API-Key" : auth
        }
    },
    function (error, response, body) {
      console.log(response.statusCode);
      console.log(body);
    }
);