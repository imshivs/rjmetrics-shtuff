require('dotenv').load();
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(process.env.GCLIENT_ID, process.env.GCLIENT_SECRET, "");

// // generate a url that asks permissions for Google+ and Google Calendar scopes
// var scopes = [
//   'https://www.googleapis.com/auth/analytics'
// ];

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: 'https://www.googleapis.com/auth/analytics'// If you only need one scope you can pass it as string
});