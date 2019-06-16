const Tom = require('test-runner').Tom
const Clf = require('./')
const a = require('assert')
const sleep = require('sleep-anywhere')

const tom = module.exports = new Tom('clf')

tom.test('one write', async function () {
  const actuals = []
  const transform = new Clf()
  transform.on('readable', function () {
    const json = this.read()
    actuals.push(JSON.parse(json))
  })
  transform.write('127.0.0.1 - - [Wed, 11 Jun 2014 15:51:48 GMT] "GET /package.json HTTP/1.1" 200 733 "http://localhost:8000/" "userAgent"')
  await sleep(10)
  a.deepStrictEqual(actuals, [
    {
      remoteHost: '127.0.0.1',
      remoteLogName: '-',
      authUser: '-',
      date: '2014-06-11T15:51:48.000Z',
      request: 'GET /package.json HTTP/1.1',
      status: 200,
      bytes: 733
    }
  ])
})

tom.test('two writes', async function () {
  const actuals = []
  const transform = new Clf()
  transform.on('readable', function () {
    const json = this.read()
    actuals.push(json.toString())
  })
  transform.write('127.0.0.1 - - [Wed, 11 Jun 2014 15:51:48 GMT] "GET /package.json HTTP/1.1" 200 733 "http://localhost:8000/" "userAgent"')
  transform.write('127.0.0.2 - - [Wed, 11 Jun 2014 15:51:48 GMT] "GET /package.json HTTP/1.1" 200 733 "http://localhost:8000/" "userAgent"')
  await sleep(10)
  a.deepStrictEqual(actuals, [
    '{"remoteHost":"127.0.0.1","remoteLogName":"-","authUser":"-","date":"2014-06-11T15:51:48.000Z","request":"GET /package.json HTTP/1.1","status":200,"bytes":733}{"remoteHost":"127.0.0.2","remoteLogName":"-","authUser":"-","date":"2014-06-11T15:51:48.000Z","request":"GET /package.json HTTP/1.1","status":200,"bytes":733}'
  ])
})

tom.test('non-numeric bytes', async function () {
  const actuals = []
  const transform = new Clf()
  transform.on('readable', function () {
    const json = this.read()
    actuals.push(JSON.parse(json))
  })
  transform.write('127.0.0.1 - - [Wed, 11 Jun 2014 15:51:48 GMT] "GET /package.json HTTP/1.1" 200 - "http://localhost:8000/" "userAgent"')
  await sleep(10)
  a.deepStrictEqual(actuals, [
    {
      remoteHost: '127.0.0.1',
      remoteLogName: '-',
      authUser: '-',
      date: '2014-06-11T15:51:48.000Z',
      request: 'GET /package.json HTTP/1.1',
      status: 200,
      bytes: 0
    }
  ])
})
