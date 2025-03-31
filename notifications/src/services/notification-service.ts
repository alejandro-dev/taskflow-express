import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export class NotificationService {
   //Enviar email
   /**
    * 
    * @description - Send an email
    * 
    * @param to - The email to send
    * @param subject - The subject of the email
    * @param replacements - The replacements to add in the email
    * @param template - The template to use
    * 
    */
   sendEmail = async (to: string, subject: string, replacements:  Record<string, any>, template: string) => {
      try {
         // Read the HTML file
         const filePath = path.resolve('templates', template);
         let html = fs.readFileSync(filePath, 'utf-8');

         // Add the path of the email to the replacements
         replacements['email'] = to;

         // Replace the placeholders in the HTML (e.g., {{name}})
         Object.keys(replacements).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g'); // Create a regular expression
            html = html.replace(regex, replacements[key]);
         });

         const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            auth: {
               user: process.env.MAIL_USER,
               pass: process.env.MAIL_PASSWORD
            }
            } as nodemailer.TransportOptions); 

         const mailOptions = {
            from: '"TaskFlow" <gestion@taskflow.com>',
            to: to,
            subject: subject,
            html: html
         };

         const info = await transporter.sendMail(mailOptions);
         console.log('Correo enviado:', info.response);
         
      } catch (error) {
         console.error('Error al enviar el correo:', error);
      }
   }; 
}