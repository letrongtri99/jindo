/**
 * Register.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        image: {
            type: 'string',
        },
        title: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        short_description: {
            type: 'string',
        },
        url: {
            type: 'string',
        },
        position: {
            type: 'string',
        },
        button: {
            type: 'string',
        },
        button_url: {
            type: 'string',
        },
        isDeleted: {
            type: 'number',
            defaultsTo: 0
        }

    },

};