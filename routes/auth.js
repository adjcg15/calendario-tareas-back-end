/*
    Rutas de usuarios - AUTH
    HOST/api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validarCampos');
const { validateJWT } = require('../middlewares/validarJWT');

const router = Router();

router.post(
    '/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        validateFields
    ], 
    createUser
);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        validateFields
    ],
    loginUser
);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;