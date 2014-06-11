"use strict";
var Transform = require("stream").Transform,
    util = require("util");

module.exports = Clf;
    
function Clf(options){
    if (!(this instanceof Clf)) return new Clf(options);
    Transform.call(this, options);
}
util.inherits(Clf, Transform);

Clf.prototype._transform = function(chunk, enc, done){
    if (chunk === null) throw "WHUT";
    var input = chunk.toString();
    var re = /([^ ]*) ([^ ]*) ([^ ]*) \[([^\]]*)\] "([^"]*)" ([^ ]*) ([^ ]*)/;
    var matches = input.match(re);
    var obj = {
        remoteHost: matches[1],
        remoteLogName: matches[2],
        authUser: matches[3],
        date: new Date(matches[4]),
        request: matches[5],
        status: Number(matches[6]),
        bytes: Number(matches[7])
    };
    this.push(JSON.stringify(obj));
    done();
}