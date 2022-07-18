const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/Usuario');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {
    const { email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });
        
        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'Su correo ya tiene una cuenta asociada'
            });
        }

        user = new User(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        
        //Generar JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch(error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const loginUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        //Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Generar JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const revalidateToken = async(req, res = response) => {
    const { uid, name } = req;

    //Generar un nuevo JWT y retornarlo
    const token = await generateJWT(uid, name);
    
    res.json({
        ok: true,
        token,
        uid,
        name
    });
}

module.exports = {
    createUser,
    loginUser,
    revalidateToken
}