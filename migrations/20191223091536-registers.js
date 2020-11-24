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
  db.createTable('registers', {
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
      name_parent: {
        type: 'text',
      },
      name_kid: {
        type: 'text',
      },
      phone: {
        type: 'text',
      },
      address: {
        type: 'text',
      },
      date_of_birth: {
        type: 'text',        
      },
      sex: {
        type: 'text',
      },
      courses: {
        type: 'text',
      },
      question: {
        type: 'text',
      },
  }, callback);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
