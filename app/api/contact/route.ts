import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 })
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net", // SendGrid SMTP host
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: "apikey", // SendGrid username is 'apikey'
        pass: process.env.SENDGRID_API_KEY, // Your SendGrid API Key
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.SENDER_EMAIL, // Your verified sender email in SendGrid
      to: process.env.RECEIVER_EMAIL, // Your email address to receive messages
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ message: "Failed to send email." }, { status: 500 })
  }
}
