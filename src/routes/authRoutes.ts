import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controller/AuthController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

//POST /api/auth/create-account
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

//POST /api/auth/confirm-account
router.post('/confirm-account',
    body('token').notEmpty().withMessage('El token es requerido'),
    handleInputErrors,
    AuthController.confirmAccount
)

router.post('/login',
    body('email').isEmail().withMessage('El email no es valido'),
    body('password').notEmpty().withMessage('La password es muy corto, minimo 8 caracteres'),
    handleInputErrors,
    AuthController.login
)

export default router