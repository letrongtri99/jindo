"use strict";

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
  db.addColumn("media", "link_yt", { type: "text" }, function() {
    db.addColumn("media", "medium", { type: "text" }, function() {
      db.addColumn("media", "small", { type: "text" }, function() {
        db.addColumn("media", "large", { type: "text" }, callback);
      });
    });
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  version: 1
};
