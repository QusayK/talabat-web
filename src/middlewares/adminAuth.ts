export default (req, res, next) => {
    if (+req.user.role !== 1)
        return res.status(403).json({message: "Access Forbidden."});

    next();
}