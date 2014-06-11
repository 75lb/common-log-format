[![view on npm](http://img.shields.io/npm/v/common-log-format.svg)](https://www.npmjs.org/package/common-log-format)
[![npm module downloads per month](http://img.shields.io/npm/dm/common-log-format.svg)](https://www.npmjs.org/package/common-log-format)
[![Build Status](https://travis-ci.org/75lb/common-log-format.svg?branch=master)](https://travis-ci.org/75lb/common-log-format)
[![Dependency Status](https://david-dm.org/75lb/common-log-format.svg)](https://david-dm.org/75lb/common-log-format)

#common-log-format
Pipe the [common log format](http://en.wikipedia.org/wiki/Common_Log_Format) in, get JSON out. Useful for converting web logs into a format more readily consumed by a node.js app. 

##Usage
###As a library
```sh
$ npm install common-log-format
```

```js
var clf = require("common-log-format");
process.stdin.pipe(clf()).pipe(process.stdout);
```

###Command line
This will install the `clf` command line tool:
```sh
$ npm install -g common-log-format
```

```sh
$ cat my-web-log.txt | clf
{"remoteHost":"127.0.0.1","remoteLogName":"-","authUser":"-","date":"2014-06-11T16:05:26.000Z","request":"GET /package.json HTTP/1.1","status":200,"bytes":733}{"remoteHost":"127.0.0.1","remoteLogName":"-","authUser":"-","date":"2014-06-11T16:05:26.000Z","request":"GET /package.json HTTP/1.1","status":200,"bytes":733}{"remoteHost":"127.0.0.1","remoteLogName":"-","authUser":"-","date":"2014-06-11T16:05:26.000Z","request":"GET /package.json HTTP/1.1","status":200,"bytes":733}{"remoteHost":"127.0.0.1","remoteLogName":"-","authUser":"-","date":"2014-06-11T16:05:27.000Z","request":"GET /package.json HTTP/1.1","status":200,"bytes":733}{"remoteHost":"127.0.0.1","remoteLogName":"-","authUser":"-","date":"2014-06-11T16:05:27.000Z","request":"GET /package.json HTTP/1.1","status":200,"bytes":733}
```
