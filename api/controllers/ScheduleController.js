/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    getSchedule: (req, res) => {
        var check_if_exist = (arr, variab) => {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == variab) {
                    return true;
                }
            }
            return false;
        };
        Schedules.find({isDeleted : 0}).exec((err, schedules) => {
            if (err) {
                console.log(err);
                return res.view(500)
            }
            var arr_district = [];
            var arr_result = [];
            for (let i = 0; i < schedules.length; i++) {
                if (
                    !check_if_exist(arr_district, schedules[i].district) &&
                    schedules[i].district != ""
                ) {
                    arr_district.push(schedules[i].district);
                }
            }
            for (let i = 0; i < arr_district.length; i++) {
                var arr = [];
                for (let j = 0; j < schedules.length; j++) {
                    if (schedules[j].district == arr_district[i]) {
                        arr.push(schedules[j]);
                    }
                }
                arr_result.push(arr);
            }
            Courses.find({isDeleted : 0})
            .then((courses)=>{
                return res.view("pages/schedule", {
                    layout: "layouts/layout",
                    schedules,
                    arr_result,
                    courses
                });
            })
        })

    },
    tableSchedule: (req, res) => {
        var total = 0;
        var arraySchedules = [];
        Schedules.count({ isDeleted: 0 }).then((data) => {
            total = data;
            return Schedules.find({ isDeleted: 0 })
        }).then((data2) => {
            data2.forEach(element => {
                arraySchedules.push([element.district, element.stadium, element.location, element.timer, element.stadium_url, element.id]);
            });
            return res.json({
                "draw": req.query.draw,
                "recordsTotal": total,
                "recordsFiltered": total,
                "data": arraySchedules
            })
        })
    },
    scheduleAdminDetails: (req, res) => {
        Schedules.findOne({ id: req.params.id }).then((data) => {
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
    scheduleAdmin: (req, res) => {
        return res.view("admin/schedule", {
            layout: "layouts/layoutadmin"
        });
    },
    editSchedules: (req, res) => {
        if (!req.body.district || !req.body.stadium || !req.body.stadium_url || !req.body.time || !req.body.location) {
            return res.json({
                success: false,
                message: 'Không đủ thông tin cá nhân'
            })
        } else {
            Schedules.find({ id: req.params.id }).then((data1) => {
                return Schedules.update({ id: req.params.id }, {
                    district: req.body.district,
                    stadium: req.body.stadium,
                    stadium_url: req.body.stadium_url,
                    location: req.body.location,
                    timer: req.body.time
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
    deleteSchedules: (req, res) => {
        Schedules.update({ id: req.params.id }, {
            isDeleted: 1
        }).fetch().then((data) => {
            if (data) {
                return res.redirect('/lich-hoc-admin');
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
    addSchedules: (req, res) => {
        return res.view("admin/newschedule", {
            layout: "layouts/layoutadmin",
        });
    },
    createNewSchedules: (req, res) => {
        if (!req.body.district || !req.body.stadium || !req.body.stadium_url || !req.body.time || !req.body.location) {
            return res.json({
                success: false,
                message: 'Không đủ thông tin'
            })
        } else {
            Schedules.create({
                district: req.body.district,
                stadium: req.body.stadium,
                stadium_url: req.body.stadium_url,
                timer: req.body.time,
                location: req.body.location,
                isDeleted: 0,
            }).fetch().then((data) => {
                return res.json({
                    success: true,
                    message: 'Thêm Mới Lịch Học Thành Công'
                })
            }).catch((e) => {
                return res.json({
                    success: false,
                    message: 'Lỗi, vui lòng thử lại'
                })
            })
        }
    }
};