import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async  (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirma tu Email",
        html:`<p>Click <a href="${confirmLink}">aqui</a> para confirmar tu cuenta </p>`
    })
}

export const sendResetPasswordEmail = async  (email: string, token: string) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Restablece tu Contraseña",
        html:`<p>Click <a href="${resetLink}">aqui</a> para modificar tu contraseña </p>`
    })
}

export const sendTwoFactorTokenEmail = async  (email: string, token: string) => {

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Codigo F2A",
        html:`<p>Tu código de Factor de Doble Autenticación es: ${token}</p>`
    })
}