/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment');
const urlSlug = require('url-slug');
module.exports = {
    

    articleDetail: (req, res) => {        
        let articleData;
        let postTime;
        Articles.findOne({ isDeleted:0,slug: req.params.slug })
            .then((article) => {                
                var time = article.postTime;
                postTime = moment(time).format('DD/MM/YYYY');
                
                articleData = article;
                return Articles.count({isDeleted:0}); 
            })
            .then((count) => {return Articles.find({isDeleted: 0}).limit(8).skip(parseInt(Math.random() * (count-8)))  })
            .then((articles) => {return articles.sort(() => 0.5 - Math.random())})
            .then((articlesRd) => { return res.view('pages/blogs_detail', { layout: 'layouts/layout', article: articleData, articleRd: articlesRd, postTime: postTime  }) })
            .catch(sails.log.error);            
    },

};