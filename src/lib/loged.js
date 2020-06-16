module.exports = {
    loged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/login');
        }
    },
    notLoged(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/perfil');
        } else {
            return next();
        }
    }
};