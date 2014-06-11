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
            date: null,
            request: "GET /package.json HTTP/1.1",
            status: 200,
            bytes: 733
        });
    });
    transform.write('127.0.0.1 - - [11/5/2014:15:55:55 +0100] "GET /package.json HTTP/1.1" 200 733 "http://localhost:8000/" "userAgent"');
});
