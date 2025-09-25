import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controller/AuthController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post('/create-account', 
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().withMessage('El email no es valido'),
    body('password').isLength({min: 8}).withMessage('La password es muy corto, minimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if(value !== req.body.password){
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    handleInputErrors,
    AuthController.createAccount
);

export default router