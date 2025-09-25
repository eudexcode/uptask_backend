import { Request, Response } from "express"
import User from "../models/User"
import bycrypt from "bcrypt"

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body)
        //Hash Password
        const salt = await bycrypt.genSalt(10)
        user.password = await bycrypt.hash(user.password, salt)

        await user.save()
        res.status(200).json({ message: 'Cuenta creada correctamente, revisa tu email para confirmarla' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la cuenta' });
    }
  };
}
