/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs');
module.exports = {
    showTable: (req, res) => {
        Coaches.find({}).then((data) => {
            res.view('admin/tablecoaches', { layout: 'layouts/layoutadmin', coaches: data });
        })
    },
    new: (req, res) => {
        return res.view('admin/newcoaches', { layout: 'layouts/layoutadmin' });
    },
    create: (req, res) => {
        const { name, description, avatar } = req.body;
        if (!name || !description || !avatar) {
            return res.json({
                success: false,
                message: 'Chưa đủ thông tin'
            })
        } else {
            Coaches.create({
                name: name,
                description: description,
                avatar: avatar
            }).fetch().then((data) => {
                return res.json({
                    success: true,
                    message: 'Thêm Mới HLV Thành Công'
                })
            }).catch((e) => {
                return res.json({
                    success: false,
                    message: 'Lỗi, vui lòng thử lại'
                })
            })
        }
    },
    getDataTableCoach: (req, res) => {
        var total = 0;
        var arrayCoach = [];
        Coaches.count({ isDeleted: 0 }).then((data) => {
            total = data;
            return Coaches.find({ isDeleted: 0 })
        }).then((data2) => {
            data2.forEach(element => {
                arrayCoach.push([element.name, element.description, element.id]);
            });
            return res.json({
                "draw": req.query.draw,
                "recordsTotal": total,
                "recordsFiltered": total,
                "data": arrayCoach
            })
        })
    },
    detail: (req, res) => {
        Coaches.findOne({ id: req.params.id }).then((data) => {
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
        if (!req.body.name || !req.body.description || !req.body.avatar) {
            return res.json({
                success: false,
                message: 'Không đủ thông tin cá nhân'
            })
        } else {
            Coaches.find({ id: req.params.id }).then((data1) => {
                    return Coaches.update({ id: req.params.id }, {
                        name: req.body.name,
                        description: req.body.description,
                        avatar: req.body.avatar
                    }).fetch()
                })
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
    delete: (req, res) => {
        Coaches.update({ id: req.params.id }, {
            isDeleted: 1
        }).fetch().then((data) => {
            if (data) {
                return res.redirect('/chinh-hlv');
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
    }

};