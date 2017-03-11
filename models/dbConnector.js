const MongoClient = require('mongodb').MongoClient;
let connector = null;

exports.MongoConnection = function () {
    return {
        connect: function () {
            MongoClient.connect("mongodb://admin:admin@ds127190.mlab.com:27190/thief", function (err, db) {
                if (err) {
                    throw err;
                }
                connector = db;
            })
        },

        getConnector: function () {
            return connector;
        },

        disconnect: function () {
            connector.close();
            connector = null;
        }
    }    
}