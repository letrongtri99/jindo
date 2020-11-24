/**
 * Register.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        title: {
            type: 'string',
        },
        content: {
            type: 'string',
        },
        cover_image: {
            type: 'string',
        },
        category: {
            type: 'string',
        },
        summary: {
            type: 'string'
        },
        isDeleted: {
            type: 'number',
            defaultsTo: 0
        },
        postTime: {
            type: 'ref',
            columnType: 'datetime',
            autoCreatedAt: true
        },
        slug: {
            type: 'string',
        }
    },

};