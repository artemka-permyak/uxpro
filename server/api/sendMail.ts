import nodemailer from 'nodemailer';
import { getErrorResponse, getSuccessResponse } from '~/server/lib'
import { EMAIL } from '~/global/const'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
    return getErrorResponse({
      message: 'SMTP настройки не указаны в .env файле',
    });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    }
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
