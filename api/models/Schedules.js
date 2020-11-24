/**
 * Register.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    stadium: {
      type: 'string',
    },
    district: {
      type: 'string',
    },
    location: {
      type: 'string',
    },
    stadium_url: {
      type: 'string',
    },
    timer: {
      type: 'string',
    },
    isDeleted: {
      type: 'number',
    }
  },

};