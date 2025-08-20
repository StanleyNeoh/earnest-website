import { NextResponse } from "next/server";

import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: process.env.EMAIL_HOST || "mail.earnest.sg",
  port: parseInt(process.env.EMAIL_OUTGOING_PORT || "465", 10),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
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
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,
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

// Accessed by chatbot api
export async function PUT(req: Request) {
  const { name, email, phone, company, service, message } = await req.json()
  console.log("RECEIVED FROM BOT API:", name, email, phone, company, service, message)
  return
}
