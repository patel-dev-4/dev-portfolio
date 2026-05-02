import { NextResponse } from "next/server";
import { Resend } from "resend";

// Make sure you update your .env.local with a NEW key!
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL as string, // This must be d.patel99979@gmail.com
      subject: `New Message from ${name} on Dev Portfolio`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (data.error) {
      console.log("RESEND BLOCKED IT:", data.error.message);
      return NextResponse.json(
        { success: false, error: data.error.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.log("SERVER CRASHED:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
