import { NextResponse } from "next/server";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.NEXT_PUBLIC_EMAIL_FROM,
//     pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
//   },
// });

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_FROM,
      to: process.env.NEXT_PUBLIC_EMAIL_TO,
      subject: "New Lead",
      html: `
        <div>
          <h1>New Lead</h1>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Company Name:</strong> ${formData.company_name}</p>
          <p><strong>Service Interest:</strong> ${formData.service_interest}</p>
          <p><strong>Message:</strong> ${formData.message}</p>
        </div>
      `,
      attachments: formData.attachments,
    };

    // const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", mailOptions);

    return NextResponse.json({ success: false, info: "Email sending not yet setup" }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
