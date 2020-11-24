module.exports = async function(req, res, proceed) {

    if (req.session.admin) {
        return proceed();
    } else {
        req.session.flash = {
            message: "Bạn cần phải đăng nhập để vào được trang này"
        }
        res.redirect('/admin');
    }

};