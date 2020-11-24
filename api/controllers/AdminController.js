/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcryptjs');
module.exports = {
    create: (req, res) => {
        // const hassPass = bcrypt.hashSync('123456', 10);
        // Admin.create({
        //     email: 'superjindo',
        //     pass: hassPass
        // }).fetch().then((data) => {
        //     return res.json(data);
        // })
        if (req.session.admin) {
            res.json({
                success: true,
                data: req.session.admin
            })
        } else {
            res.json({
                success: false,
                message: 'No account avaiable'
            })
        }
    },
    signInNow: (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            res.json({
                success: false,
                message: 'Không đủ thông tin'
            })
        } else {
            Admin.findOne({ email: username }).then((data) => {
                if (!data) {
                    res.json({
                        success: false,
                        message: 'Nhập sai tên đăng nhập'
                    })
                } else if (!bcrypt.compareSync(password, data.pass)) {
                    res.json({
                        success: false,
                        message: 'Sai Mật Khẩu'
                    })
                } else {
                    req.session.admin = {
                        username: data.email
                    }
                    res.json({
                        success: true,
                        message: 'Đăng Nhập Thành Công'
                    })

                }
            })
        }

    },
    viewlogin: (req, res) => {
        res.view('admin/adminlogin');
    },
    logout: (req, res) => {
        req.session.destroy((error) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            } else {
                res.redirect('/admin');
            }
        })
    }

};