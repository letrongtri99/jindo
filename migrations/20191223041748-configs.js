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
  db.createTable('configs', {
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
      address: {
        type: 'text',
      },
      mail: {
        type: 'text',
      },
      link_yt: {
        type: 'text',
      },
      link_fb: {
        type: 'text',
      },
      phone_number: {
        type: 'varchar',
        length: 13,
      },
      students_number: {
        type: 'int',
        length: 15,
      },
      coaches_number: {
        type: 'int',
        length: 15,
      },
      places_number: {
        type: 'int',
        length: 15,
      },
      prices: {
        type: 'varchar',
        length: 255,
      },
  }, callback);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
