#!/usr/bin/env node
const Clf = require('common-log-format')

process.stdin.pipe(new Clf()).pipe(process.stdout)
