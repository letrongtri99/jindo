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
  db.createTable('coaches', {
      createdAt: {
          type: 'text',
          autoCreatedAt: true,
      },
      updatedAt: {
          type: 'text',
          autoUpdatedAt: true,
      },
      id: {
        type: 'int',
        primarayKey: true,
        unique: true,
        autoIncrement: true,
        length: 15,
      },
      name: {
        type: 'varchar',
        length: 255,
      },
      description: {
        type: 'text',
      },
      avatar: {
        type: 'text',
      }
  }, callback);
};
exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
