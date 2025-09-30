import { transporter } from "../config/nodemailer";

interface IEmail {
    email: string;
    name: string;
    token: string;
}


export class AuthEmail {
    static sendConfirmationEmail = async ( user: IEmail) => {
        await transporter.sendMail({
            from: 'TaskManager <noreply@projectmanager.com>',
            to: user.email,
            subject: 'Confirma tu cuenta en TaskManager',
            text: 'Confirma tu cuenta en TaskManager',
            html: `<p>Hola ${user.name}, confirma tu cuenta en TaskManager</p>
            <p>Tu codigo de confirmacion es: <b>${user.token}</b> </p>
            <p>Para confirmar tu cuenta, haz click en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/auth/confirmar">Confirmar cuenta</a></p>
            <p><i><em>Este token expira en 10 minutos</em></i></p>
            <p>Si no solicitaste este codigo, ignora este mensaje</p>
            `
        })
    }

    static sendPasswordResetToken = async ( user: IEmail) => {
        await transporter.sendMail({
            from: 'TaskManager <noreply@projectmanager.com>',
            to: user.email,
            subject: 'TaskManager - Reestablece tu contraseña.',
            text: 'TaskManager - Reestablece tu contraseña.',
            html: `<p>Hola ${user.name}, reestablece tu contraseña en TaskManager</p>
            <p>Para reestablecer tu contraseña, haz click en el siguiente enlace: 
            <a href="${process.env.FRONTEND_URL}/auth/nueva-contrasena">Reestablecer contraseña</a></p>
            <p>E ingrese el codigo: <b>${user.token}</b> </p>
            <p><i><em>Este token expira en 10 minutos</em></i></p>
            `
        })
    }

}