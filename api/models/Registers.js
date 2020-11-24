/**
 * Register.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        name_parent: {
            type: 'string',
        },
        name_kid: {
            type: 'string',
        },
        phone: {
            type: 'string',
        },
        address: {
            type: 'string',
        },
        date_of_birth: {
            type: 'ref',
            columnType: 'datetime'
        },
        sex: {
            type: 'string',
        },
        courses: {
            type: 'string',
        },
        question: {
            type: 'string',
        },
        isDeleted: {
            type: 'number',
            defaultsTo: 0
        },
        registerTime: {
            type: 'ref',
            columnType: 'datetime',
            autoCreatedAt: true
        }
    },

};