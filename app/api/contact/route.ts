import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: 'RESEND_API_KEY is missing.',
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const name = String(body.name || '').trim();
    const company = String(body.company || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const service = String(body.service || '').trim();
    const message = String(body.message || '').trim();

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please fill all required fields.',
        },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name);
    const safeCompany = escapeHtml(company || 'Not provided');
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || 'Not provided');
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(message).replaceAll('\n', '<br />');

    const { data, error } = await resend.emails.send({
      from: 'Acesta Analytics <website@acestaanalytics.com>',
      to: ['shubham@acestaanalytics.com'],
      replyTo: email,
      subject: `New enquiry from ${name} | Acesta Analytics`,
      html: `
        <div style="margin:0;padding:0;background:#f7f3ea;font-family:Arial,Helvetica,sans-serif;color:#111111;">
          <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
            <div style="background:#ffffff;border:1px solid #e5dcc8;border-radius:18px;padding:28px;">
              <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9f7229;font-weight:700;">
                Acesta Analytics
              </p>

              <h1 style="margin:0 0 22px 0;font-size:28px;line-height:1.15;color:#111111;">
                New website enquiry
              </h1>

              <div style="border-top:1px solid #eee5d2;padding-top:20px;">
                <p style="margin:0 0 10px 0;"><strong>Name:</strong> ${safeName}</p>
                <p style="margin:0 0 10px 0;"><strong>Company:</strong> ${safeCompany}</p>
                <p style="margin:0 0 10px 0;"><strong>Email:</strong> ${safeEmail}</p>
                <p style="margin:0 0 10px 0;"><strong>Phone:</strong> ${safePhone}</p>
                <p style="margin:0 0 10px 0;"><strong>Service Needed:</strong> ${safeService}</p>
              </div>

              <div style="margin-top:24px;border-top:1px solid #eee5d2;padding-top:20px;">
                <p style="margin:0 0 10px 0;"><strong>Message:</strong></p>
                <p style="margin:0;line-height:1.7;color:#333333;">${safeMessage}</p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);

      return NextResponse.json(
        {
          success: false,
          message: 'Email could not be sent. Please try again.',
        },
        { status: 500 }
      );
    }

    // ---- NEW: fire n8n webhook for AI qualification + auto-reply to the lead ----
    if (process.env.N8N_WEBHOOK_URL) {
      try {
        await fetch(process.env.N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, message, company, service }),
        });
      } catch (webhookError) {
        console.error('n8n webhook failed:', webhookError);
      }
    }
    // ---- END NEW ----

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Contact API error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again.',
      },
      { status: 500 }
    );
  }
}