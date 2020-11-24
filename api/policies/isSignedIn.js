module.exports = async function(req, res, proceed) {

    if (!req.session.admin) {
        return proceed();
    } else {
        req.session.flash = {
            message: "Chào mừng bạn quay trở lại"
        }
        res.redirect('/hoc-vien-dang-ki');
    }

};