var test = require("tape");
var Clf = require("../");

test("connect default", function(t){
    t.plan(1);
    var transform = new Clf();
    transform.on("readable", function(){
        var json = this.read();
        logObject = JSON.parse(json);
        t.deepEqual(logObject, {
            remoteHost: "127.0.0.1",
            remoteLogName: "-",
            authUser: "-",
            date: "2014-06-11T15:51:48.000Z",
            request: "GET /package.json HTTP/1.1",
            status: 200,
            bytes: 733
        });
    });
    transform.write('127.0.0.1 - - [Wed, 11 Jun 2014 15:51:48 GMT] "GET /package.json HTTP/1.1" 200 733 "http://localhost:8000/" "userAgent"');
});
