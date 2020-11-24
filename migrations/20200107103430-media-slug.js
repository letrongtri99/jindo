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
    db.addColumn('media', 'slug', { type: 'text' }, function() {
        db.removeColumn('media', 'name', function() {
            db.removeColumn('media', 'medium', function() {
                db.removeColumn('media', 'small', function() {
                    db.removeColumn('media', 'large', callback)
                })
            })
        })
    });
};

exports.down = function(db) {
    return null;
};

exports._meta = {
    "version": 1
};