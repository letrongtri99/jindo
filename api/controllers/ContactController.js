/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
String.prototype.escape = function () {
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return this.replace(/[&<>]/g, function (tag) {
        return tagsToReplace[tag] || tag;
    });
};
const moment = require('moment');

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
module.exports = {
    getContact: (req, res) => {
        let name = req.body.name;
        let phone = req.body.phone;
        let address = req.body.address;
        let email = req.body.email;
        let question = req.body.question;

        Contacts.create({
            name: name,
            phone: phone,
            address: address,
            email: email,
            question: question
        })
            .fetch().then((data) => {
                var mailOptions = {
                    from: sails.config.mail.mailFrom,
                    to: sails.config.mail.mailTo,
                    subject: 'Thông Tin Người Liên Hệ',
                    text: 'abc',
                    template: 'mailContact',
                    context: {
                        name: name,
                        phone: phone,
                        address: address,
                        email: email,
                        question: question
                    }
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);

                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                return res.json({
                    success: true,
                    message: 'Cảm ơn bạn đã gửi thông tin liên hệ!',
                })
            })
            .catch((err) => {
                console.log(err);
                return res.view('500');
            })
    },

    getDataTableContact: (req, res) => {
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
        var arrayContact = [];
        Contacts.count({ isDeleted: 0 }).then((data) => {
            total = data;
            return Contacts.find().where({ or: [{ name: { contains: req.query.search.value } }, { phone: { contains: req.query.search.value } }, { email: { contains: req.query.search.value } }, { address: { contains: req.query.search.value } }], isDeleted: 0 }).skip(Number(req.query.start)).limit(Number(req.query.length)).sort([b]);
            // return Contacts.find({ or: [{ name_kid: req.query.search.value }], skip: Number(req.query.start), limit: Number(req.query.length) })
        }).then((data2) => {
            data2.forEach(element => {
                var postTime = moment(element.contactTime).format('DD/MM/YYYY  HH:mm:ss');
                arrayContact.push([element.name, element.email, element.phone, element.address, postTime, element.id]);
            });
            return Contacts.find().where({ or: [{ name: { contains: req.query.search.value } }, { phone: { contains: req.query.search.value } }, { email: { contains: req.query.search.value } }, { address: { contains: req.query.search.value } }], isDeleted: 0 })
        }).then((data3) => {
            return res.json({
                "draw": req.query.draw,
                "recordsTotal": total,
                "recordsFiltered": data3.length,
                "data": arrayContact
            })
        })
    },
    detail: (req, res) => {
        Contacts.findOne({ id: req.params.id }).then((data) => {
            if (data) {
                res.json({
                    success: true,
                    message: 'Thành Công',
                    info: data,
                })
            } else {
                res.json({
                    success: false,
                    message: 'Thất Bại'
                })
            }
        }).catch((e) => {
            console.log(e);
            res.json({
                success: false,
                message: e
            })
        })
    },
    showInfo: (req, res) => {
        res.view('admin/tablecontact', { layout: 'layouts/layoutadmin' });
    },
    delete: (req, res) => {
        Contacts.update({ id: req.params.id }, {
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