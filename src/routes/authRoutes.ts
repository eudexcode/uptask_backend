import { Router } from "express";
import { body, param } from "express-validator";
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
    body('token').notEmpty().withMessage('El token no puede estar vacio'),
    handleInputErrors,
    AuthController.confirmAccount
)

//POST /api/auth/login
router.post('/login',
    body('email').isEmail().withMessage('El email no es valido'),
    body('password').notEmpty().withMessage('La password es muy corto, minimo 8 caracteres'),
    handleInputErrors,
    AuthController.login
)

//POST /api/auth/request-code
router.post('/request-code',
    body('email').isEmail().withMessage('El email no es valido'),
    handleInputErrors,
    AuthController.requestConfirmationCode
)

//POST /api/auth/forgot-password
router.post('/forgot-password',
    body('email').isEmail().withMessage('El email no es valido'),
    handleInputErrors,
    AuthController.forgotPassword
)

router.post('/validate-token',
    body('token').notEmpty().withMessage('El token no puede estar vacio'),
    handleInputErrors,
    AuthController.validateToken
)

router.post('/update-password/:token',
    param('token').isNumeric().withMessage('El token no es valido'),
    body('password').isLength({min: 8}).withMessage('La password es muy corto, minimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if(value !== req.body.password){
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
    handleInputErrors,
    AuthController.updatePasswordWithToken
)

export default router