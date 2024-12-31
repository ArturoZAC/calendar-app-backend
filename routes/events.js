import { Router } from "express"
import { createEvent, deleteEvent, getEvents, updateEvent } from "../controllers/events.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { isDate } from "../helpers/isDate.js";


export const eventsRouter = Router();


eventsRouter.use( validarJWT );

eventsRouter.get('/', getEvents)
eventsRouter.post(
                '/', 
                [
                  check('title', 'El titulo es obligatorio').not().isEmpty(),
                  check('start', 'La Fecha de inicio es obligatorio').custom( isDate ),
                  check('end', 'La Fecha de finalizacion es obligatorio').custom( isDate ),
                  validarCampos
                ],
                createEvent)
eventsRouter.put(
                '/:id',
                [
                  check('title', 'El titulo es obligatorio').not().isEmpty(),
                  check('start', 'La Fecha de inicio es obligatorio').custom( isDate ),
                  check('end', 'La Fecha de finalizacion es obligatorio').custom( isDate ),
                  validarCampos
                ],
                updateEvent)
eventsRouter.delete('/:id', deleteEvent)

