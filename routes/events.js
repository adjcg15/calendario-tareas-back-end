/*
    Event route
    HOST/api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/validarCampos');
const { validateJWT } = require('../middlewares/validarJWT');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

//Aplicar el middleware a todas las rutas
router.use(validateJWT);

//Obtener eventos
router.get('/', getEvents);

//Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inico es obligatoria').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria').custom(isDate),
        validateFields
    ],
    createEvent
);

//Actualizar un evento
router.put('/:id', updateEvent);

//Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;