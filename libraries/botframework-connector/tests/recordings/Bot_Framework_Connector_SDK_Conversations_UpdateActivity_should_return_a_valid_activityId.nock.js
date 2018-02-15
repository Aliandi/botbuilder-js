// This file has been autogenerated.

exports.setEnvironment = function() {
  process.env['USER_ID'] = 'U3Z9ZUDK5:T03CWQ0QB';
  process.env['BOT_ID'] = 'B21S8SG7J:T03CWQ0QB';
  process.env['HOST_URL'] = 'https://slack.botframework.com';
  process.env['AZURE_SUBSCRIPTION_ID'] = 'db1ab6f0-4769-4b27-930e-01e2ef9c123c';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://slack.botframework.com:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/v3/conversations', '*')
  .reply(200, "{\r\n  \"id\": \"B21S8SG7J:T03CWQ0QB:D8K7XGZU3\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '45',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  server: 'Microsoft-IIS/10.0',
  'request-context': 'appId=cid-v1:6814484e-c0d5-40ea-9dba-74ff29ca4f62',
  'x-powered-by': 'ASP.NET',
  'strict-transport-security': 'max-age=31536000',
  date: 'Tue, 09 Jan 2018 15:40:40 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://slack.botframework.com:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/v3/conversations', '*')
  .reply(200, "{\r\n  \"id\": \"B21S8SG7J:T03CWQ0QB:D8K7XGZU3\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '45',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  server: 'Microsoft-IIS/10.0',
  'request-context': 'appId=cid-v1:6814484e-c0d5-40ea-9dba-74ff29ca4f62',
  'x-powered-by': 'ASP.NET',
  'strict-transport-security': 'max-age=31536000',
  date: 'Tue, 09 Jan 2018 15:40:40 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://slack.botframework.com:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/v3/conversations/B21S8SG7J%3AT03CWQ0QB%3AD8K7XGZU3/activities', '*')
  .reply(200, "{\r\n  \"id\": \"1515512441.000111\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '33',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  server: 'Microsoft-IIS/10.0',
  'request-context': 'appId=cid-v1:6814484e-c0d5-40ea-9dba-74ff29ca4f62',
  'x-powered-by': 'ASP.NET',
  'strict-transport-security': 'max-age=31536000',
  date: 'Tue, 09 Jan 2018 15:40:40 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://slack.botframework.com:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/v3/conversations/B21S8SG7J%3AT03CWQ0QB%3AD8K7XGZU3/activities', '*')
  .reply(200, "{\r\n  \"id\": \"1515512441.000111\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '33',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  server: 'Microsoft-IIS/10.0',
  'request-context': 'appId=cid-v1:6814484e-c0d5-40ea-9dba-74ff29ca4f62',
  'x-powered-by': 'ASP.NET',
  'strict-transport-security': 'max-age=31536000',
  date: 'Tue, 09 Jan 2018 15:40:40 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://slack.botframework.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/v3/conversations/B21S8SG7J%3AT03CWQ0QB%3AD8K7XGZU3/activities/1515512441.000111', '*')
  .reply(200, "{\r\n  \"id\": \"1515512441.000111\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '33',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  server: 'Microsoft-IIS/10.0',
  'request-context': 'appId=cid-v1:6814484e-c0d5-40ea-9dba-74ff29ca4f62',
  'x-powered-by': 'ASP.NET',
  'strict-transport-security': 'max-age=31536000',
  date: 'Tue, 09 Jan 2018 15:40:40 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://slack.botframework.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/v3/conversations/B21S8SG7J%3AT03CWQ0QB%3AD8K7XGZU3/activities/1515512441.000111', '*')
  .reply(200, "{\r\n  \"id\": \"1515512441.000111\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '33',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  server: 'Microsoft-IIS/10.0',
  'request-context': 'appId=cid-v1:6814484e-c0d5-40ea-9dba-74ff29ca4f62',
  'x-powered-by': 'ASP.NET',
  'strict-transport-security': 'max-age=31536000',
  date: 'Tue, 09 Jan 2018 15:40:40 GMT',
  connection: 'close' });
 return result; }]];