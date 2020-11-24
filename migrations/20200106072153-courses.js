'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function(db, callback) {
    db.createTable(
        "courses", {
            id: {
                type: "int",
                primarayKey: true,
                unique: true,
                autoIncrement: true,
                length: 11
            },
            typecourse: {
                type: "text"
            },
            price: {
                type: "text"
            },
            sale: {
                type: "text"
            },
            priceafter: {
                type: "text",
            },
            createdAt: {
                type: "text",
                autoCreatedAt: true
            },
            updatedAt: {
                type: "text",
                autoUpdatedAt: true
            }
        },
        callback
    );
};

exports.down = function(db) {
    return null;
};

exports._meta = {
    "version": 1
};