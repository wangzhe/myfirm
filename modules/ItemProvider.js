var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

ItemProvider = function (host, port) {
    this.db = new Db('backbonee', new Server(host, port, {auto_reconnect:true}, {}), {safe:true});
    this.db.open(function (err, db) {
        if (!err) {
            console.log('connect');
        } else {
            console.log(err);
        }
    });
};

ItemProvider.prototype.getCollection = function (callback) {
    this.db.collection('items', function (error, collection) {
        if (error) callback(error);
        else callback(null, collection);
    });
};

ItemProvider.prototype.save = function (item, callback) {
    this.getCollection(function (error, collection) {
        if (error) callback(error)
        else {
            collection.insert(item, function (err,result) {
                console.log(result);
                console.log(item);
                callback(item);
            });
        }
    });
};

exports.ItemProvider = ItemProvider;