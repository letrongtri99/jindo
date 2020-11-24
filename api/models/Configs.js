/**
 * Register.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        address: {
            type: 'string',
          },
          mail: {
            type: 'string',
          },
          link_yt: {
            type: 'string',
          },
          link_fb: {
            type: 'string',
          },
          phone_number: {
            type: 'string',            
          },
          students_number: {
            type: 'number',
          },
          coaches_number: {
            type: 'number',            
          },
          places_number: {
            type: 'number',            
          },
    },

};