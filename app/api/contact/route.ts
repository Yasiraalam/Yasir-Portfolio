import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

// Define a schema for your form data using Zod
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = contactFormSchema.parse(body)

    const { name, email, subject, message } = validatedData

    // Create a Nodemailer transporter using your email service details
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use other services like 'outlook', 'sendgrid', etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email address from environment variables
        pass: process.env.EMAIL_PASS, // Your email password or App Password from environment variables
      },
    })

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: "yasiralam981@gmail.com", // Recipient address
      subject: `Portfolio Contact: ${subject} from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    console.log("Email sent successfully!")
    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      console.error("Validation error:", error.errors)
      return NextResponse.json({ message: "Validation failed", errors: error.errors }, { status: 400 })
    }
    console.error("Error sending message:", error)
    return NextResponse.json({ message: "Failed to send message." }, { status: 500 })
  }
}
