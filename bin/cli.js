#!/usr/bin/env node
const clf = require('common-log-format')

process.stdin.pipe(clf()).pipe(process.stdout)
