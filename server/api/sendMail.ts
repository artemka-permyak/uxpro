import nodemailer from 'nodemailer';
import { defineEventHandler, readBody } from 'h3';
import { EMAIL } from '~/global/const'
import { getErrorResponse, getSuccessResponse } from '~/server/lib'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || '',
    port: process.env.SMTP_PORT || '',
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Сайт uxpro.ru" <${process.env.SMTP_USER}>`,
      to: EMAIL,
      subject: `Комментарий от ${body.name}`,
      text: `Сообщение от клиента:\n\nИмя: ${body.name}\nEmail: ${body.email}\nТелефон: ${body.phone}\nКомментарий: ${body.comment}`,
    });

    return getSuccessResponse({
      message: 'Комментарий успешно отправлен!'
    })
  } catch (error) {
    return getErrorResponse(error)
  }
});
