import { NextResponse } from "next/server";

import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.CLIENT_EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.CLIENT_REFRESH_TOKEN,
  }
})

export async function POST(req: Request) {
  const data = await req.formData()
  const attachments = data.getAll("attachments") as File[]
  const attachmentData = await Promise.all(attachments.map(async (file: File) => {
    return {
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
      encoding: "base64"
    };
  }));

  try {
    const info = await transporter.sendMail({
      from: process.env.CLIENT_EMAIL,
      to: process.env.GMAIL_RECIPIENT,
      subject: "New Form Submission",
      attachments: attachmentData,
      text: `
        Name: ${data.get("name")}
        Email: ${data.get("email")}
        Phone: ${data.get("phone")}
        Company Name: ${data.get("company_name")}
        Service Interest: ${data.get("service_interest")}
        Message: ${data.get("message")}
      `,
    })
    return NextResponse.json({ success: true, data: info })
  } catch (error) {
    console.error("Error sending email: ", error)
    return NextResponse.json({ success: false, error: "Failed to send email" })
  }
}
