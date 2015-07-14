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

var Client = require('node-hubspot');

var client = new Client();

client.useKey(process.env.HUBSPOT_API_KEY);
client.useToken(process.env.HUBSPOT_API_KEY);
client.campaigns.get(function(err, res) {
    if (err) { throw err; }
    console.log(res);
});