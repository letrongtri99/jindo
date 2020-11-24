/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs');
const moment = require('moment');
const urlSlug = require('url-slug');
module.exports = {
    // getArticle: (req, res) => {
    //     Articles.find({isDeleted: 0})
    //         .then((articles) => {
    //             return res.view('pages/blogs', { layout: 'layouts/layout', articles: articles })
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             return res.view('500');
    //         })
    // },
    getArticle: (req, res) => {
        let total;
        let pageNumber = Number(req.params.pageNumber);
        Articles.count({ category: 'Tin tức thể thao', isDeleted: 0 })
            .then((data) => {
                total = data;
                if (!req.params.pageNumber) {
                    return Articles.find({ where: { isDeleted: 0, category: 'Tin tức thể thao' }, limit: 9, skip: 0 })
                } else {
                    return Articles.find({ where: { isDeleted: 0, category: 'Tin tức thể thao' }, limit: 9, skip: 9 * (pageNumber - 1) })
                }
            })
            .then((articles) => {
                return res.view('pages/blogs', { layout: 'layouts/layout', articles: articles, page: req.params.pageNumber ? pageNumber : 1, total: total })
            })
            .catch((err) => {
                console.log(err);
                return res.view('500');
            })
    },

    getArticleSkill: (req, res) => {
        let total;
        let pageNumber = Number(req.params.pageNumber);
        Articles.count({ category: 'Kỹ thuật thể thao', isDeleted: 0 })
            .then((data) => {
                total = data;
                if (!req.params.pageNumber) {
                    return Articles.find({ where: { isDeleted: 0, category: 'Kỹ thuật thể thao' }, limit: 9, skip: 0 })
                } else {
                    return Articles.find({ where: { isDeleted: 0, category: 'Kỹ thuật thể thao' }, limit: 9, skip: 9 * (pageNumber - 1) })
                }
            })
            .then((articles) => {
                return res.view('pages/skills', { layout: 'layouts/layout', articles: articles, page: req.params.pageNumber ? pageNumber : 1, total: total })
            })
            .catch((err) => {
                console.log(err);
                return res.view('500');
            })
    },
    getArticleCLB: (req, res) => {
        let total;
        let pageNumber = Number(req.params.pageNumber);
        Articles.count({ category: 'Tin tức các CLB', isDeleted: 0 })
            .then((data) => {
                total = data;
                if (!req.params.pageNumber) {
                    return Articles.find({ where: { isDeleted: 0, category: 'Tin tức các CLB' }, limit: 9, skip: 0 })
                } else {
                    return Articles.find({ where: { isDeleted: 0, category: 'Tin tức các CLB' }, limit: 9, skip: 9 * (pageNumber - 1) })
                }
            })
            .then((articles) => {
                return res.view('pages/newsCLB', { layout: 'layouts/layout', articles: articles, page: req.params.pageNumber ? pageNumber : 1, total: total })
            })
            .catch((err) => {
                console.log(err);
                return res.view('500');
            })
    },

    // articleDetail: (req, res) => {        
    //     Articles.findOne({ id: req.query.id })
    //         .then((article) => {

    //             return res.view('pages/blogs_detail', { layout: 'layouts/layout', article: article })
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             return res.view('500');
    //         })
    // },

    // Hien nhung bai viet moi
    getNewsData: (req, res) => {
        Articles.count({ isDeleted: 0 })
            .then((count) => { return Articles.find({ where: { isDeleted: 0, category: 'Tin tức thể thao' } }).sort('createdAt DESC').limit(4) })
            .then((articles) => { res.json({ news: articles }) })
            .catch(sails.log.error);
    },
    getVidsData: (req, res) => {
        Media.find({ isDeleted: 0,type:'video'}).sort('createdAt DESC').limit(4)
            .then((data) => { res.json({ vids: data }) })
            .catch(sails.log.error);
    },


    new: (req, res) => {
        res.view('admin/articleslist', { layout: 'layouts/layoutadmin' })
    },
    newArticle: (req, res) => {
        res.view('admin/newarticle', { layout: 'layouts/layoutadmin' })
    },
    create: (req, res) => {
        if (!req.body.title || !req.body.summary || !req.body.cover || !req.body.category || !req.body.content) {
            return res.json({
                success: false,
                message: 'Chưa đủ thông tin bài viết'
            })
        } else {
            Articles.create({
                title: req.body.title,
                content: req.body.content,
                cover_image: req.body.cover,
                category: req.body.category,
                summary: req.body.summary,
                slug: urlSlug(req.body.title, {
                    transformer: urlSlug.transformers.lowercase
                })
            }).fetch().then((data) => {
                return res.json({
                    success: true,
                    message: 'Thêm Mới Bài Viết Thành Công'
                })
            }).catch((e) => {
                console.log(e);
                return res.json({
                    success: false,
                    message: 'Lỗi, vui lòng thử lại'
                })
            })
        }
    },
    getDataTableArticles: (req, res) => {
        var orderColumn = req.query.order[0].column;
        var nameColumn = req.query.columns[orderColumn].name;
        var dir;
        if (req.query.order[0].dir == 'asc') {
            dir = 'ASC';
        } else {
            dir = 'DESC';
        }
        var b = {};
        b[nameColumn] = dir;
        var total = 0;
        var filter = 0;
        var arrrayArticle = [];
        Articles.count({ isDeleted: 0 }).then((data) => {
            total = data;
            return Articles.find().where({ or: [{ title: { contains: req.query.search.value } }, { category: { contains: req.query.search.value } }], isDeleted: 0 }).skip(Number(req.query.start)).limit(Number(req.query.length)).sort([b]);
        }).then((data2) => {
            data2.forEach(element => {
                var postTime = moment(element.postTime).format('DD/MM/YYYY HH:mm:ss');
                arrrayArticle.push([element.title, element.category, postTime, element.id]);
            });
            return Articles.find().where({ or: [{ title: { contains: req.query.search.value } }, { category: { contains: req.query.search.value } }], isDeleted: 0 })
        }).then((data3) => {
            return res.json({
                "draw": req.query.draw,
                "recordsTotal": total,
                "recordsFiltered": data3.length,
                "data": arrrayArticle
            })
        })
    },
    delete: (req, res) => {
        Articles.update({ id: req.params.id }, {
            isDeleted: 1
        }).fetch().then((data) => {
            if (data) {
                return res.json({
                    success: true,
                    message: 'Xóa Thành Công'
                })
            } else {
                return res.json({
                    success: false,
                    message: 'Không Tìm Thấy Dữ liệu'
                })
            }
        }).catch((e) => {
            return res.json({
                success: false,
                message: e
            })
        })
    },
    editview: (req, res) => {
        res.view('admin/editarticle', { layout: 'layouts/layoutadmin' });
    },
    detail: (req, res) => {
        Articles.findOne({ id: req.params.id }).then((data) => {
            if (data) {
                res.json({
                    success: true,
                    message: 'Thành Công',
                    info: data
                })
            } else {
                res.json({
                    success: false,
                    message: 'Thất Bại'
                })
            }
        }).catch((e) => {
            res.json({
                success: false,
                message: e
            })
        })
    },
    edit: (req, res) => {
        if (!req.body.title || !req.body.summary || !req.body.link || !req.body.category || !req.body.content) {
            return res.json({
                success: false,
                message: 'Không đủ thông tin cá nhân'
            })
        } else {
            Articles.update({ id: req.params.id }, {
                    title: req.body.title,
                    content: req.body.content,
                    cover_image: req.body.link,
                    category: req.body.category,
                    summary: req.body.summary,
                    slug: urlSlug(req.body.title, {
                        transformer: urlSlug.transformers.lowercase
                    })
                }).fetch()
                .then((data) => {
                    if (data) {
                        return res.json({
                            success: true,
                            message: 'Chỉnh Sửa Thành Công'
                        })
                    } else {
                        return res.json({
                            success: false,
                            message: 'Không Tìm Thấy Dữ liệu'
                        })
                    }
                }).catch((e) => {
                    console.log(e);
                    return res.json({
                        success: false,
                        message: e
                    })

                })
        }
    },

};