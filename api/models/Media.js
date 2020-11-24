/**
 * Register.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        path: {
            type: "string",
            allowNull: true
        },
        type: {
            type: "string"
        },
        title: {
            type: "string",
            allowNull: true
        },
        album: {
            type: "string",
            allowNull: true
        },
        link_yt: {
            type: "string",
            allowNull: true
        },
        slug: {
            type: "string",
            allowNull: true
        },
        isDeleted: {
            type: 'number',
            defaultsTo: 0
        },
        small: {
            type: "string",
            allowNull: true
        },
        medium: {
            type: "string",
            allowNull: true
        },
        large: {
            type: "string",
            allowNull: true
        }
    }
};