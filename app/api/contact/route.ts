import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    const { name, email, subject, message } = formData

    // Here you would typically send the email using a service like Nodemailer, SendGrid, etc.
    // For this example, we'll just log the data and simulate success.
    console.log("Contact form submission received:")
    console.log(`Name: ${name}`)
    console.log(`Email: ${email}`)
    console.log(`Subject: ${subject}`)
    console.log(`Message: ${message}`)

    // Simulate a delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real application, you would integrate with an email sending service here.
    // Example with a placeholder for an actual email sending logic:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'your-email@example.com', // Your email address
      from: 'noreply@yourdomain.com', // Your verified sender email
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };
    await sgMail.send(msg);
    */

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ message: "Failed to send message." }, { status: 500 })
  }
}
