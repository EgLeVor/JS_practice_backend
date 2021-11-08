const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const User = require('../dataBase/models/User.model');
const { asyncHandler, requireToken } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.get('/get', asyncHandler(requireToken), asyncHandler(userGetInfo));
    router.post('/lgt', asyncHandler(requireToken), asyncHandler(userLogout));
    router.patch('/upd', asyncHandler(requireToken), asyncHandler(userUpdateInfo));
}

async function userLogout(req, res, next) {
    await req.token.destroy();
    res.status(200).json({message: "LOGOUT SUCCESSFUL"});
}

async function userGetInfo(req, res, next) {
    const findUser = await User.findOne({
        where:
        {
            id: req.token.userId
        }
    });
    if (!findUser) {
        throw new ErrorResponse("USER NOT FOUND", 400)
    }
    res.status(200).json(findUser);
}

async function userUpdateInfo(req, res, next) {
    const findUser = await User.findOne({
        where:
        {
            id: req.token.userId
        }
    });
    if (!findUser) {
        throw new ErrorResponse("USER NOT FOUND", 400)
    }
    await findUser.update(req.body);
    res.status(200).json({message: "UPDATE SUCCESSFUL"});
}

initRoutes();

module.exports = router;