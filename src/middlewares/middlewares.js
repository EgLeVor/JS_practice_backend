const ErrorResponse = require("../classes/error-response");
const Token = require("../dataBase/models/Token.model");

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const syncHandler = (fn) => (req, res, next) => {
    try {
        fn(req, res, next);
    } catch (error) {
        next(error);
    }
};

const notFound = (req, _res, next) => {
    next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

const errorHandler = (err, _req, res, _next) => {
    console.log('Ошибка', {
        message: err.message,
        stack: err.stack,
    });
    res.status(err.code || 500).json({
        message: err.message
    });
};

const requireToken = async(req, res, next) => {
    const token = req.header("token");
    if(!token){
        throw new ErrorResponse("TOKEN IS NULL", 400);
    }

    const findToken = await Token.findOne({
        where:
        {
            value: token,
        }
    });
    console.log(token);
    if(!findToken){
        throw new ErrorResponse("TOKEN NOT FOUND", 404);
    }

    const limit = 120;
    if (parseInt(new Date(new Date().toLocaleString("en-US")) - new Date(String(findToken.createdAt)))/1000 > limit)
    {
        await findToken.destroy();
        throw new ErrorResponse("TOKEN EXPIRED", 401);
    }

    req.token = findToken;
    next();
};

module.exports = {
    asyncHandler,
    syncHandler,
    notFound,
    errorHandler,
    requireToken
};