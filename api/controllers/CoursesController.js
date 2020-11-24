/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    editCourses: (req, res) => {
        return res.view('admin/editcourses', { layout: 'layouts/layoutadmin' })
    },
    getDataTableCourses: (req, res) => {
        var total = 0;
        var arrayCourses = [];
        Courses.count({ isDeleted: 0 }).then((data) => {
            total = data;
            return Courses.find({ isDeleted: 0 })
        }).then((data2) => {
            data2.forEach(element => {
                arrayCourses.push([element.typecourse, element.price, element.sale, element.priceafter, element.id]);
            });
            return res.json({
                "draw": req.query.draw,
                "recordsTotal": total,
                "recordsFiltered": total,
                "data": arrayCourses
            })
        })
    },
    create: (req, res) => {
        if (!req.body.typecourse || !req.body.price || !req.body.sale || !req.body.priceafter) {
            return res.json({
                success: false,
                message: 'Chưa đủ thông tin khóa học'
            })
        } else {
            Courses.create({
                typecourse: req.body.typecourse,
                price: req.body.price,
                sale: req.body.sale,
                priceafter: req.body.priceafter,
            }).fetch().then((data) => {
                return res.json({
                    success: true,
                    message: 'Thêm Mới Khóa Học Thành Công'
                })
            }).catch((e) => {
                return res.json({
                    success: false,
                    message: 'Lỗi, vui lòng thử lại'
                })
            })
        }
    },
    info: (req, res) => {
        Courses.findOne({ id: req.params.id }).then((data) => {
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
        if (!req.body.typecourse || !req.body.price || !req.body.sale || !req.body.priceafter) {
            return res.json({
                success: false,
                message: 'Không đủ thông tin khóa học'
            })
        } else {
            Courses.update({ id: req.params.id }, {
                    typecourse: req.body.typecourse,
                    price: req.body.price,
                    sale: req.body.sale,
                    priceafter: req.body.priceafter
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
    delete: (req, res) => {
        Courses.update({ id: req.params.id }, {
            isDeleted: 1
        }).fetch().then((data) => {
            if (data) {
                return res.redirect('/chinh-khoa-hoc');
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
    getCoursesData: (req, res) => {
        Courses.find({})
            .then(data => {
                res.json({
                    courses: data
                });
            })
            .catch(err => {
                console.log(err);
                return res.view("500");
            });         
    }
}