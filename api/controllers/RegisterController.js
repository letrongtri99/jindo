/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


// SEND MAIL CONFIGS
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require("path");

const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: path.join(__dirname, '../../') + '/views/pages/',
        layoutsDir: path.join(__dirname, '../../') + '/views/pages/',
        defaultLayout: '',
    },
    viewPath: path.join(__dirname, '../../') + '/views/pages/',
    extName: '.hbs',
};

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {        
        user: sails.config.mail.mailFrom,
        pass: sails.config.mail.password
    }
  });
transporter.use('compile', hbs(handlebarOptions));




var moment = require('moment');
module.exports = {
    getRegister: (req, res) => {
        let name_parent = req.body.name_parent;
        let name_kid = req.body.name_kid;
        let phone = req.body.phone;
        let address = req.body.address;
        let dob = req.body.date_of_birth;
        let sex = req.body.sex;
        let courses = req.body.courses;
        let question = req.body.question;
        //format dob
        var formatDob = moment(dob, "DD/MM/YYYY").format("YYYY-MM-DD");
        Registers.create({
                name_parent: name_parent,
                name_kid: name_kid,
                phone: phone,
                address: address,
                date_of_birth: formatDob,
                sex: sex,
                courses: courses,
                question: question,
            })
            .fetch().then((data) => {
                var mailOptions = {
                    from: sails.config.mail.mailFrom,
                    to: sails.config.mail.mailTo,
                    subject: 'Thông Tin Học Viên Đăng Ký',
                    text: 'abc',
                    template: 'mail',
                    context: {
                        name_parent: name_parent,
                        name_kid: name_kid,
                        phone: phone,
                        address: address,
                        date_of_birth: dob,
                        sex: sex,
                        courses: courses,
                        question: question,
                    }
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);

                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                return res.json({
                    success: true,
                    message: 'Cảm ơn bạn đã đăng ký!',
                })
            })
            .catch((err) => {
                console.log(err);
                return res.view('500');
            })
    },
    showInfo: (req, res) => {
        res.view('admin/studentregister', { layout: 'layouts/layoutadmin' });
    },
    getDataTableRegister: (req, res) => {
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
        var arrayRegister = [];
        Registers.count({ isDeleted: 0 }).then((data) => {
            total = data;
            return Registers.find().where({ or: [{ name_kid: { contains: req.query.search.value } }, { name_parent: { contains: req.query.search.value } }], isDeleted: 0 }).skip(Number(req.query.start)).limit(Number(req.query.length)).sort([b]);
            // return Registers.find({ or: [{ name_kid: req.query.search.value }], skip: Number(req.query.start), limit: Number(req.query.length) })
        }).then((data2) => {
            data2.forEach(element => {
                var postTime = moment(element.registerTime).format('DD/MM/YYYY HH:mm:ss');
                arrayRegister.push([element.name_parent, element.name_kid, element.phone, element.courses, postTime, element.id]);
            });
            return Registers.find().where({ or: [{ name_kid: { contains: req.query.search.value } }, { name_parent: { contains: req.query.search.value } }], isDeleted: 0 })
        }).then((data3) => {
            return res.json({
                "draw": req.query.draw,
                "recordsTotal": total,
                "recordsFiltered": data3.length,
                "data": arrayRegister
            })
        })
    },
    detail: (req, res) => {
        Registers.findOne({ id: req.params.id }).then((data) => {
            let date = moment(data.date_of_birth).format('DD/MM/YYYY');
            if (data) {
                res.json({
                    success: true,
                    message: 'Thành Công',
                    info: data,
                    ngay: date
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
        const { name_parent, name_kid, phone, address, date_of_birth, sex, courses, question } = req.body;
        if (!name_parent || !name_kid || !phone || !address || !date_of_birth || !sex || !courses) {
            return res.json({
                success: false,
                message: 'Không đủ thông tin cá nhân'
            })
        } else if (courses != "Khóa Học Bóng Đá" && courses != "Khóa Học Bóng Rổ") {
            return res.json({
                success: false,
                message: 'Thông Tin Khóa Học Nhập Sai'
            })
        } else {
            var myDate = moment(date_of_birth, "DD/MM/YYYY").format("YYYY-MM-DD");
            Registers.update({ id: req.params.id }, {
                name_parent: name_parent,
                name_kid: name_kid,
                phone: phone,
                address: address,
                date_of_birth: myDate,
                sex: sex,
                question: question,
                courses: courses
            }).fetch().then((data) => {
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
                return res.json({
                    success: false,
                    message: e
                })
            })
        }
    },
    delete: (req, res) => {
        console.log(req.params.id);
        Registers.update({ id: req.params.id }, {
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
    }

};