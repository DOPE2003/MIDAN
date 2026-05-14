import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, company, email, phone, subject, message } = await req.json()

    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from:    `"${name}" <${process.env.SMTP_USER}>`,
      to:      process.env.CONTACT_TO ?? 'projects@midangrup.com',
      replyTo: email,
      subject: `[Midan Contact] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;color:#111">
          <h2 style="color:#001030;margin-bottom:16px">New Enquiry — Midan Alemar</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr style="background:#f4f6fa"><td style="padding:10px 14px;font-weight:600;width:120px">Name</td><td style="padding:10px 14px">${name}</td></tr>
            <tr><td style="padding:10px 14px;font-weight:600">Company</td><td style="padding:10px 14px">${company}</td></tr>
            <tr style="background:#f4f6fa"><td style="padding:10px 14px;font-weight:600">Email</td><td style="padding:10px 14px">${email}</td></tr>
            <tr><td style="padding:10px 14px;font-weight:600">Phone</td><td style="padding:10px 14px">${phone}</td></tr>
            <tr style="background:#f4f6fa"><td style="padding:10px 14px;font-weight:600">Subject</td><td style="padding:10px 14px">${subject}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#f9fafb;border-left:3px solid #7030A0;font-size:14px;white-space:pre-wrap">${message}</div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact route]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
