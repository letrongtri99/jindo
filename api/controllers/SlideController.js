/**
 * RegisterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    showSlides: (req, res) => {
        return res.view("admin/adminSlide", {
            layout: 'layouts/layoutadmin',
        });
    },


    getSlides: (req, res) => {
        Slides.find({ isDeleted: 0 })
            .then((data) => {
                return res.json({ slides: data })
            })
    },
    editSlide: (req, res) => {
        console.log(req.body);
        if (!req.body.title || !req.body.description || !req.body.short_description || !req.body.image || !req.body.url || !req.body.position || !req.body.button || !req.body.button_url) {
            return res.json({
                success: false,
                message: 'Không đủ thông tin slide'
            })
        } else {
            Slides.update({ id: req.params.id }, {
                    title: req.body.title,
                    description: req.body.description,
                    short_description: req.body.short_description,
                    image: req.body.image,
                    url: req.body.url,
                    position: req.body.position,
                    button: req.body.button,
                    button_url: req.body.button_url
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
    deleteSlide: (req, res) => {
        Slides.update({ id: req.params.id }, {
            isDeleted: 1
        }).fetch().then((data) => {
            if (data) {
                return res.json({
                    success: true,
                    message: 'Xóa Slide Thành Công'
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
    createSlide: (req, res) => {
        if (!req.body.title || !req.body.description || !req.body.short_description || !req.body.image || !req.body.url || !req.body.position || !req.body.button_url || !req.body.button) {
            return res.json({
                success: false,
                message: 'Không đủ thông tin slide'
            })
        } else {
            Slides.create({
                    title: req.body.title,
                    description: req.body.description,
                    short_description: req.body.short_description,
                    image: req.body.image,
                    url: req.body.url,
                    position: req.body.position,
                    button: req.body.button,
                    button_url: req.body.button_url,
                }).fetch()
                .then((data) => {
                    if (data) {
                        return res.json({
                            success: true,
                            message: 'Thêm mới slide thành công'
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
    }
};