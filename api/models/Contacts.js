/**
 * Register.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        name: {
            type: 'string',
        },
        phone: {
            type: 'string',
        },
        email: {
            type: 'string',
        },
        address: {
            type: 'string',
        },
        question: {
            type: 'string',
        },
        isDeleted: {
            type: 'number'
        },
        contactTime: {
            type: 'ref',
            columnType: 'datetime',
            autoCreatedAt: true
        },
    },

};