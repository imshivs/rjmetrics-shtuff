require('dotenv').load();

var _ = require('lodash'),
    moment = require('moment'),
    request = require('request'),
    async = require('async'),
    username = "shivani@npmjs.com",
    password = "AgeQuodAgis@5",
    target = 'https://api.hubapi.com/contacts/v1/lists/all/contacts/all',
    auth = process.env.HUBSPOT_API_KEY,
    // metrics = [],
    dateCount = [],
    ProgressBar = require('progress'),
    counter = 0,
    bar = new ProgressBar('downloading [:bar] :current', {total: 1253} );
    // peeps = {}

module.exports = function (cb) {
    var q = async.queue(function (work, done) {

        // console.log('got work', work)

        var obj = {
            "hapikey" : auth,
            "count" : 100,
            "showListMemberships": "true"
        }

        if (work.offset) obj.vidOffset = work.offset
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
                                var date = moment(new Date(timestamp)).format("MM-DD-YYYY");
                                
                                // peeps[name] = peeps[name] ? peeps[name] + 1 : 1
                                // metrics.push({"name": name, "data" : {"id": id, "timestamp": timestamp}});
                                // metrics.push({"date": date, human: {"name": name, "list_id": list_id}});
                                
                                dateCount[date] = (dateCount[date] || 0) + 1;
                                // counter = counter +1;
                                // console.log(".");
                                bar.tick(1);                                
                                // console.log("\n\n\n")
                            }
                        })
                    
                })

    // console.log(dateCount);
    // console.log(dateCount.sort());
    // dateCount.sort(function(a,b){
    //     return a[0].getTime() - b[0].getTime();

    // });
    //     dateCount.forEach(function(obj){
    //         console.log(obj.date);
    //     });
    // console.log(dateCount);
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

    q.drain = function(){
        // here's where we do something with the data.
        // output the values of metrics object, do some math on it ...
        console.log('we finished walking over all of the contacts in hubspot!')
        // console.log(counter);
        // // console.log(dateCount);
        // console.log(peeps, Object.keys(peeps).length);
        return cb(Object.keys(dateCount).map(function(key){
            return {date:key, count:dateCount[key]}
        }));
    }
}