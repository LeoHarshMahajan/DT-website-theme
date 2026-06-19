const FROM = 'Digital Triangle <noreply@thedigitaltriangle.com>';
const NOTIFY = 'hm@digitaltriangle.in';
const RESEND_URL = 'https://api.resend.com/emails';

interface LeadData {
  type?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  budget?: string;
  services?: string;
  goals?: string;
  slot?: string;
  message?: string;
  source?: string;
}

function row(label: string, value?: string | null) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:7px 0;color:#525260;font-size:13px;width:120px;vertical-align:top;">${label}</td>
      <td style="padding:7px 0;color:#c8c8d4;font-size:13px;font-weight:500;">${value}</td>
    </tr>`;
}

function typeLabel(type?: string) {
  if (type === 'CONSULTATION') return { label: 'Consultation Request', color: '#8b5cf6' };
  if (type === 'AUDIT') return { label: 'Free Audit Request', color: '#c026d3' };
  return { label: 'Contact Form', color: '#4b6bff' };
}

export async function sendLeadNotification(lead: LeadData): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  const { label, color } = typeLabel(lead.type);

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#07070a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#07070a;padding:32px 20px;">
    <tr><td align="center">
      <table width="540" cellpadding="0" cellspacing="0" style="max-width:540px;width:100%;">

        <!-- Header -->
        <tr><td style="padding-bottom:24px;">
          <div style="display:inline-block;background:linear-gradient(135deg,#4b6bff,#8b5cf6);border-radius:8px;padding:8px 14px;">
            <span style="color:#fff;font-weight:800;font-size:15px;letter-spacing:-0.5px;">DT</span>
          </div>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:#0d0d12;border-radius:14px;border:1px solid rgba(255,255,255,0.07);padding:32px;">

          <!-- Type badge + heading -->
          <div style="margin-bottom:20px;">
            <span style="display:inline-block;background:${color}18;border:1px solid ${color}40;color:${color};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;text-transform:uppercase;letter-spacing:0.08em;">${label}</span>
            <h2 style="color:#ffffff;font-size:20px;font-weight:700;margin:10px 0 4px;">New lead from ${lead.name}</h2>
            <p style="color:#525260;font-size:13px;margin:0;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })} IST</p>
          </div>

          <!-- Data table -->
          <div style="background:#131318;border-radius:10px;border:1px solid rgba(255,255,255,0.05);padding:16px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row('Name', lead.name)}
              ${row('Email', `<a href="mailto:${lead.email}" style="color:#4b6bff;">${lead.email}</a>`)}
              ${row('Phone', lead.phone)}
              ${row('Company', lead.company)}
              ${row('Website', lead.website)}
              ${row('Budget', lead.budget)}
              ${row('Services', lead.services)}
              ${row('Goals', lead.goals)}
              ${row('Slot', lead.slot)}
              ${row('Source', lead.source)}
            </table>
          </div>

          ${lead.message ? `
          <!-- Message -->
          <div style="margin-top:16px;background:#131318;border-radius:10px;border:1px solid rgba(255,255,255,0.05);padding:16px 20px;">
            <p style="color:#525260;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;font-weight:700;margin:0 0 8px;">Message</p>
            <p style="color:#c8c8d4;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${lead.message}</p>
          </div>` : ''}

          <!-- Reply CTA -->
          <div style="margin-top:24px;text-align:center;">
            <a href="mailto:${lead.email}?subject=Re: Your enquiry at Digital Triangle" style="display:inline-block;background:linear-gradient(135deg,#4b6bff,#8b5cf6);color:#fff;font-weight:600;font-size:14px;padding:12px 28px;border-radius:9px;text-decoration:none;">Reply to ${lead.name} →</a>
          </div>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:20px;text-align:center;">
          <p style="color:#525260;font-size:11px;margin:0;">Digital Triangle Admin · Lead notification</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await fetch(RESEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      from: FROM,
      to: NOTIFY,
      reply_to: lead.email,
      subject: `🔔 New ${typeLabel(lead.type).label} — ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
      html,
    }),
  });
}
