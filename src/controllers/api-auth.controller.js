const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const { Op } = require('sequelize');
const User = require('../dataBase/models/User.model.js');
const Token = require('../dataBase/models/Token.model.js');
const { asyncHandler } = require('../middlewares/middlewares');
const { nanoid } = require('nanoid');

const router = Router();

function initRoutes() {
    router.post('/login', asyncHandler(userLogin));
    router.post('/registration', asyncHandler(userRegistration));
}

async function userLogin(req, res, next) {
    const findUser = await User.findOne({
        where:
        {
            login: req.body.login,
            password: req.body.password
        }
    });
    if (!findUser) {
        throw new ErrorResponse("LOGIN FAILED", 400)
    }
    const token = await Token.create({ userId: findUser.id })
    res.status(200).json({ accessToken: token.value });
}

async function userRegistration(req, res, next) {
    const findUser = await User.findOne({
        where:
        {
            [Op.or]: [
                { email: req.body.email },
                { login: req.body.login }
            ]
        }
    });

    if (findUser) {
        throw new ErrorResponse("USER EXISTS", 400)
    }

    const user = await User.create(req.body);
    res.status(200).json(user);
}


initRoutes();

module.exports = router;