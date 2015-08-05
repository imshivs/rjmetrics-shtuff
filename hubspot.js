require('dotenv').load();
var request = require('request');

// var npme_basic_signup, npme_agreed_ula;

//CONTACT LISTS--npm E basic signup
var username = "shivani@npmjs.com",
    password = "AgeQuodAgis@5",
    target = 'https://api.hubapi.com/contacts/v1/lists/30?portalId=419727&hapikey=',
    auth = process.env.HUBSPOT_API_KEY;

// function getnpmEBasicSignup() {

//         request(
//             {
//                 url : target + auth,
//                 headers : {
//                     "X-RJM-API-Key" : auth
//                 }
//             },
//             function (error, response, body) {
//               // console.log(response.statusCode);
//               return JSON.parse(body).metaData.size;
//             }
//         );
// }

// // //CONTACT LISTS--npm E Agreed ULA

// target = 'https://api.hubapi.com/contacts/v1/lists/32?portalId=419727&hapikey=',

// function getnpmEAgreedULA() {
    
//         request(
//             {
//                 url : target + auth,
//                 headers : {
//                     "X-RJM-API-Key" : auth
//                 }
//             },
//             function (error, response, body) {
//               // console.log(response.statusCode);
//               return JSON.parse(body).metaData.size;

//             }
//         );
// }


// getnpmEBasicSignup(function(data){
//     console.log(data);
// });
// getnpmEAgreedULA(function(data){
//     console.log(data);
// });

//CAMPAIGN IDS

// var username = "shivani@npmjs.com",
//     password = "AgeQuodAgis@5",
//     email = 'http://api.hubapi.com/email/public/v1/subscriptions/timeline?hapikey=',
//     auth = process.env.HUBSPOT_API_KEY;
// console.log(auth);
// request(
//     {
//         url : email + auth,
//         headers : {
//             "X-RJM-API-Key" : auth
//         }
//     },
//     function (error, response, body) {
//       console.log(response.statusCode);
//       console.log(body);
//     }
// );
var moment = require('moment');
var _ = require('lodash');

var async = require('async')
    username = "shivani@npmjs.com",
    password = "AgeQuodAgis@5",
    target = 'https://api.hubapi.com/contacts/v1/lists/all/contacts/all',
    auth = process.env.HUBSPOT_API_KEY,
    metrics = [];

var q = async.queue(function (work, done) {

    // console.log('got work', work)

    var obj = {
        "hapikey" : auth,
        "count" : 100,
        "showListMemberships": "true"
    }

    if (work.offset) obj.vidOffset = work.offset
    var dateCount = [];
    request(
        {
            url : target,
            headers : {
                "X-RJM-API-Key" : auth
            },
            qs: obj,
            json: true
        },
        function (error, response, body) {
            // plug data into metrics.
            
            body.contacts.forEach(function (contact) {
               // console.log(contact.properties.firstname.value + ' ' + contact.properties.lastname.value)
                    contact['list-memberships'].forEach(function(list){
                        if(list["static-list-id"] === 30){
                            var name = contact.properties.firstname.value + ' ' + contact.properties.lastname.value;
                            var list_id = list["static-list-id"];
                            var timestamp = list.timestamp;
                            var date = moment.unix(timestamp).format("MM/DD");
                            // metrics.push({"name": name, "data" : {"id": id, "timestamp": timestamp}});
                            metrics.push({"date": date, human: {"name": name, "list_id": list_id}});
                            
                            _.map(metrics,function(e,i){
                                dateCount[e.date] = (dateCount[e.date] || 0) + 1;

                            });    
                            console.log(".")

                            // console.log(metrics);
                            // console.log("\n\n\n")
                        }
                    })
                
            })
// console.log(dateCount.sort());
dateCount.sort(function(a,b){
    return a[0].getTime() - b[0].getTime();

});

console.log(dateCount);
// console.log(dateCount);

            // console.log(body['vid-offset']);

            if (body['vid-offset']) {
                q.push({offset: body['vid-offset']})
            }

            return done()
        }
    );

}, 1)

q.push({})

q.drain = function () {
    // here's where we do something with the data.
    // output the values of metrics object, do some math on it ...
    console.log('we finished walking over all of the contacts in hubspot!')
}