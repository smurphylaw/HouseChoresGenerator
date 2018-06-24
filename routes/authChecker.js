function authChecker(req, res, next) {
    if (req.session && req.session.userId) {
        return res.redirect('/generator');
    }
    return next();
}

module.exports.authChecker = authChecker;