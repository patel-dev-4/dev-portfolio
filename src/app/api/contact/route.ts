import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    console.log("Attempting to send email via Resend...");

    const data = await resend.emails.send({
      // You must use this exact "from" address on the free tier
      from: "Portfolio Contact <onboarding@resend.dev>",
      // This MUST match your verified Resend account email address exactly
      to: process.env.CONTACT_EMAIL as string,
      subject: `New Message from ${name} on Dev Portfolio`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    // Catch Resend API errors (like unverified email addresses)
    if (data.error) {
      console.error("Resend API Error:", data.error);
      return NextResponse.json(
        { success: false, error: data.error.message },
        { status: 400 },
      );
    }

    console.log("Email sent successfully!");
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
