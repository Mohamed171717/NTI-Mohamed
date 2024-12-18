
import nodemailer from "nodemailer";

const sendMail = async (options: any): Promise<void> => {

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const emailOption: any = {
        from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USERNAME}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    };
    await transporter.sendMail(emailOption);

};

export default sendMail;