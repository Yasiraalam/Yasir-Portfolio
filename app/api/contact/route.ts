import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

// Define a schema for your form data using Zod
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  message: z.string().min(1, { message: "Message is required." }),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedFields = contactFormSchema.safeParse(body)

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Validation Error",
          errors: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const { name, email, subject, message } = validatedFields.data

    // Create a Nodemailer transporter using your email service details
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use other services like 'outlook', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email address (e.g., yasiralam981@gmail.com)
        pass: process.env.EMAIL_PASS, // Your App Password for Gmail
      },
    })

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: "yasiralam981@gmail.com", // Recipient address
      subject: `Portfolio Contact: ${subject}`,
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
    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ message: "Failed to send email." }, { status: 500 })
  }
}
