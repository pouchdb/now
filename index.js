"use strict";

var express  = require('express');
var expressPouchDB = require('express-pouchdb');
var cors = require('./cors');

var PouchDB  = require('pouchdb-core')
  .plugin(require('pouchdb-adapter-node-websql'))
  .plugin(require('pouchdb-adapter-http'))
  .plugin(require('pouchdb-replication'))
  .plugin(require('pouchdb-mapreduce'))
  .plugin(require('pouchdb-find'));

var app = express();
var pouchDBApp = expressPouchDB(PouchDB);

app.use(cors(pouchDBApp.couchConfig));
app.use(pouchDBApp);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server started on port ' + port)
});

process.on('SIGINT', function () {
  process.exit(0);
});
