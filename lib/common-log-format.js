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
    var input = chunk.toString();
    var obj = {
        remoteHost: "clive",
        request:"GET /summut"
    };
    this.push(JSON.stringify(obj));
    done();
}