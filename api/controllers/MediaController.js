/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const urlSlug = require('url-slug');
module.exports = {
    show: (req, res) => {
        var check_if_exist = (arr, variab) => {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == variab) {
                    return true;
                }
            }
            return false;
        };
        Media.find({ isDeleted: 0 }).exec((err, medias) => {
            if (err) {
                console.log(err);
                return res.view(500);
            }
            var arr_alb = [];
            var arr_all = [];
            for (let i = 0; i < medias.length; i++) {
                if (!check_if_exist(arr_alb, medias[i].album) &&
                    (medias[i].album != "") && (medias[i].album != null)
                ) {
                    arr_alb.push(medias[i].album);
                }
            }
            for (let i = 0; i < arr_alb.length; i++) {
                var arr = [];
                for (let j = 0; j < medias.length; j++) {
                    if (medias[j].album == arr_alb[i]) {
                        arr.push(medias[j]);
                    }
                }
                arr_all.push(arr);
            }
            return res.view("pages/about_images", {
                layout: "layouts/layout",
                medias,
                arr_all
            });
        });
    },
    images: (req, res) => {
        return res.view("admin/imagesarticle", {
            layout: "layouts/layoutadmin"
        });
    },
    getDataTableImages: (req, res) => {
        var total = 0;
        var filter = 0;
        var arrrayImages = [
            []
        ];
        var arrayImagesFilter = [
            []
        ];
        Media.find({ type: 'picture', isDeleted: 0 })
            .then((data1) => {
                data1.forEach((e) => {
                    for (var i = 0; i < arrrayImages.length; i++) {
                        if (e.album == arrrayImages[i][0]) {
                            break;
                        } else if (i == arrrayImages.length - 1) {
                            arrrayImages.push([e.album, e.slug]);
                        }
                    }

                })
                arrrayImages.splice(0, 1);
                return Media.find().where({ or: [{ album: { contains: req.query.search.value } }], type: 'picture', isDeleted: 0 })
            }).then((data2) => {
                data2.forEach((el) => {
                    for (var i = 0; i < arrayImagesFilter.length; i++) {
                        if (el.album == arrayImagesFilter[i][0]) {
                            break;
                        } else if (i == arrayImagesFilter.length - 1) {
                            arrayImagesFilter.push([el.album, el.slug]);
                        }
                    }

                })
                arrayImagesFilter.splice(0, 1);
                return res.json({
                    "draw": req.query.draw,
                    "recordsTotal": arrrayImages.length,
                    "recordsFiltered": arrayImagesFilter.length,
                    "data": arrayImagesFilter
                })
            }).catch((e) => {
                console.log(e);
            })
    },
    detailalbum: (req, res) => {
        Media.find({
            slug: req.query.ten,
            type: 'picture',
            isDeleted: 0
        }).sort([{ createdAt: 'DESC' }]).then((data) => {
            return res.view('admin/detailsalbum', {
                layout: "layouts/layoutadmin",
                anh: data
            })
        }).catch((e) => {
            console.log(e);
        })

    },
    createPic: (req, res) => {
        Media.find({
            slug: req.body.slug,
            type: 'picture'
        }).then((data) => {
            return Media.create({
                slug: req.body.slug,
                path: req.body.path,
                small: req.body.small,
                medium: req.body.medium,
                large: req.body.large,
                album: data[0].album,
                type: 'picture'
            }).fetch()
        }).then((data2) => {
            return res.json({
                success: true,
                message: 'Thêm Mới Ảnh Thành Công'
            })
        }).catch((e) => {
            console.log(e);
        })
    },
    delete: (req, res) => {
        Media.update({ id: req.params.id }, {
            isDeleted: 1
        }).fetch().then((data) => {
            return Media.count({
                slug: req.params.album,
                isDeleted: 0
            })
        }).then((data2) => {
            if (data2 || data2 == 0) {
                return res.json({
                    count: data2,
                    success: true,
                    message: 'Xóa Ảnh Thành Công'
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
    },
    new: (req, res) => {
        return res.view('admin/createalbum', {
            layout: "layouts/layoutadmin"
        })
    },
    newAlbum: (req, res) => {
        if (!req.body.path || !req.body.album) {
            return res.json({
                success: false,
                message: 'Chưa đủ thông tin album'
            })
        } else {
            Media.create({
                path: req.body.path,
                slug: urlSlug(req.body.album, {
                    transformer: urlSlug.transformers.lowercase
                }),
                small: req.body.small,
                medium: req.body.medium,
                large: req.body.large,
                album: req.body.album,
                type: 'picture'
            }).fetch().then((data) => {
                return res.json({
                    success: true,
                    message: 'Thêm Mới Album Thành Công'
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
    deleteAlbum: (req, res) => {
        Media.update({ slug: req.params.slug }, {
            isDeleted: 1
        }).fetch().then((data) => {
            if (data) {
                return res.json({
                    success: true,
                    message: 'Xóa Album Thành Công'
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
    },
    changeName: (req, res) => {
        if (!req.body.album) {
            return res.json({
                success: false,
                message: 'Vui lòng nhập tên album cần thay đổi'
            })
        } else {
            Media.update({ slug: req.params.SLUG }, {
                slug: urlSlug(req.body.album, {
                    transformer: urlSlug.transformers.lowercase
                }),
                album: req.body.album,
            }).fetch().then((data) => {
                if (data) {
                    return res.json({
                        success: true,
                        message: 'Thay Đổi Tên Album Thành Công',
                        slug: data[0].slug
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
    video: (req, res) => {
        return res.view('admin/tablevideo', {
            layout: "layouts/layoutadmin"
        })
    },
    getDataTableVideo: (req, res) => {
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
        var arrayMedia = [];
        Media.count({ isDeleted: 0, type: 'video' }).then((data) => {
            total = data;
            return Media.find().where({ or: [{ title: { contains: req.query.search.value } }, { link_yt: { contains: req.query.search.value } }], isDeleted: 0, type: 'video' }).skip(Number(req.query.start)).limit(Number(req.query.length)).sort([b]);
        }).then((data2) => {
            data2.forEach(element => {
                arrayMedia.push([element.title, element.link_yt, element.id]);
            });
            return Media.find().where({ or: [{ title: { contains: req.query.search.value } }, { link_yt: { contains: req.query.search.value } }], isDeleted: 0, type: 'video' })
        }).then((data3) => {
            return res.json({
                "draw": req.query.draw,
                "recordsTotal": total,
                "recordsFiltered": data3.length,
                "data": arrayMedia
            })
        })
    },
    detailVideo: (req, res) => {
        Media.findOne({ id: req.params.id }).then((data) => {
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
    editVideo: (req, res) => {
        if (!req.body.title || !req.body.link_yt) {
            return res.json({
                success: false,
                message: 'Không đủ thông tin video'
            })
        } else {
            Media.update({ id: req.params.id }, {
                    title: req.body.title,
                    link_yt: req.body.link_yt,
                    path: req.body.path
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
    deleteVideo: (req, res) => {
        Media.update({ id: req.params.id }, {
            isDeleted: 1
        }).fetch().then((data) => {
            if (data) {
                return res.json({
                    success: true,
                    message: 'Xóa Video Thành Công'
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
    },
    createVideo: (req, res) => {
        if (!req.body.title || !req.body.link_yt || !req.body.path) {
            return res.json({
                success: false,
                message: 'Chưa đủ thông tin video'
            })
        } else {
            Media.create({
                title: req.body.title,
                link_yt: req.body.link_yt,
                path: req.body.path,
                type: 'video'
            }).fetch().then((data) => {
                return res.json({
                    success: true,
                    message: 'Thêm mới video thành công'
                })
            }).catch((e) => {
                console.log(e);
                return res.json({
                    success: false,
                    message: 'Lỗi, vui lòng thử lại'
                })
            })
        }
    }
};