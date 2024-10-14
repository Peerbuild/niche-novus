import { sendMail } from "@/lib/nodemailer";

export const sendEmail = async ({
  email,
  name,
  message,
}: {
  email: string;
  name: string;
  message: string;
}) => {
  try {
    await sendMail({
      to: "priyobrotokar@gmail.com",
      subject: `A new message from ${name}`,
      html: `<div><p>Client name: ${name}</p><p>Client email: ${email}</p><p>${message}</p></div>`,
    });
  } catch (error) {
    console.error(error);
  }
};
