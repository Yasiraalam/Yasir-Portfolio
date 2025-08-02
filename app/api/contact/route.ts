import { NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"

// Set the SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "")

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 })
    }

    const msg = {
      to: "yasiralam981@gmail.com", // Your email address where you want to receive messages
      from: "yasiralam981@gmail.com", // Your verified SendGrid sender email
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    }

    await sgMail.send(msg)
    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ message: "Failed to send email." }, { status: 500 })
  }
}
