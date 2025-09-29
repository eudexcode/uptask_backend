import { Request, Response } from "express"
import User from "../models/User"
import Token from "../models/Token";
import { hashPassword, checkPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/Authemail";


export class AuthController {
  //Crear cuenta
  static createAccount = async (req: Request, res: Response) => {
    try {
        const { password, email } = req.body

        //Prevenir duplicados
        const userExists = await User.findOne({email})
        if(userExists) {
          const error = new Error ('El email ya está registrado')
          return res.status(409).json({ error: error.message })
        }

        //Crear Usuario
        const user = new User(req.body)

        //Hash Password
        user.password = await hashPassword(password)
        
        //Generar Token
        const token = new Token()
        token.token = generateToken()
        token.user = user.id

        //Enviar email
        AuthEmail.sendConfirmationEmail({
          email: user.email,
          name: user.name,
          token: token.token
        })

        await Promise.allSettled([user.save(), token.save()])

        res.status(200).json('Cuenta creada correctamente, revisa tu email para confirmarla');
    } catch (error) {
        res.status(500).json('Error al crear la cuenta' );
    }
  };

  //Confirmar cuenta
  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body

      const tokenExits = await Token.findOne({token})
      if(!tokenExits){
        const error = new Error('Token no válido')
        return res.status(404).json({ error: error.message })
      }

      const user =await User.findById(tokenExits.user)
      user.confirmed = true

      await Promise.allSettled([user.save(), tokenExits.deleteOne()])

      res.status(200).json('Cuenta confirmada correctamente' );

    }catch(error){
      res.status(500).json('Error al confirmar la cuenta');
    }
  };

  //Iniciar sesión
  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({email})
      if(!user){
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({error: error.message})
      }

      if(!user.confirmed){
        const token = new Token()
        token.user = user.id
        token.token = generateToken()

        await token.save()
        AuthEmail.sendConfirmationEmail({
          email: user.email,
          name: user.name,
          token: token.token
        })

        const error = new Error('La cuenta no ha sido confirmada, revisa tu email para confirmarla')
        return res.status(401).json({error: error.message})
      }

      //Comparar password
      const isPasswordCorrect = await checkPassword(password, user.password)
      if(!isPasswordCorrect){
        const error = new Error('La contraseña es incorrecta')
        return res.status(401).json({error: error.message})
      }

      res.status(200).json('Autenticando...')
    }catch(error){
      res.status(500).json('Hubo un error al iniciar sesión');
    }
  };
}
