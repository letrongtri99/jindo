/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    getConfigsAdmin: (req, res) => {
        Configs.find().exec((err, configs) => {
            if(err){
                console.log(err);
                return res.view(500);
            }
            return res.view("admin/configs",{
                layout: "layouts/layoutadmin",
                configs
            })
        })
    },
    editConfigs: (req, res) => {
        if (!req.body.address || !req.body.mail || !req.body.link_yt || 
            !req.body.link_fb || !req.body.phone_number || !req.body.students_number || !req.body.places_number) {
            return res.json({
                success: false,
                message: 'Không đủ thông tin cá nhân'
            })
        } else {
            Configs.find({ id: 1 }).then((data1) => {
                return Configs.update({ id: 1 }, {
                    address: req.body.address,
                    stadium: req.body.stadium,
                    link_yt: req.body.link_yt,
                    phone_number: req.body.phone_number,
                    students_number: req.body.students_number,
                    link_fb: req.body.link_fb,
                    places_number: req.body.places_number,
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
};