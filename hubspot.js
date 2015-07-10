require('dotenv').load();
var hubspotAPI = require('hubspot');

var token = process.env.HUBSPOT_API_KEY;

try {
    var api = hubspotAPI({
      token: token,
      version : 'v3'
    });
} catch (error) {
    console.log(error.message); // the options are missing, this function throws an error.
}

api.sources({ user_id: 30 }, function (error, data) {
    if (error)
        console.log(error.message);
    else
        console.log(JSON.stringify(data)); // Do something with your data!
});