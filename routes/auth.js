import { Router } from "express";
import { createNewUser, loginUser, revalidToken } from "../controllers/auth.js";
import { check } from "express-validator";
import { validarCampos, validarJWT } from "../middlewares/index.js";

export const authRouter = Router();

authRouter.post('/new',
            [
              check('name', 'El nombre es obligatorio').not().isEmpty(),
              check('email', 'El email es obligatorio').isEmail(),
              check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6}),
              validarCampos
            ],
            createNewUser)


authRouter.post('/', 
            [
              check('email', 'El email es obligatorio').isEmail(),
              check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6}),
              validarCampos
            ],
             loginUser)


authRouter.get('/renew', [validarJWT], revalidToken)