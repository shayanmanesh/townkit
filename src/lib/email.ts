// Email service configuration
// This module supports multiple email providers (SendGrid, Postmark, Resend)

interface EmailProvider {
  sendEmail(params: EmailParams): Promise<boolean>;
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
}

interface LeadNotificationData {
  homeownerName: string;
  email: string;
  phone?: string;
  projectType: string;
  projectDescription: string;
  timeline: string;
  budget: string;
  city: string;
  contractorName: string;
  contractorEmail: string;
}

interface ConfirmationEmailData {
  homeownerName: string;
  projectType: string;
  city: string;
  submittedAt: string;
}

// SendGrid Implementation
class SendGridProvider implements EmailProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendEmail(params: EmailParams): Promise<boolean> {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: params.to }],
          }],
          from: { email: params.from },
          subject: params.subject,
          content: [
            {
              type: 'text/html',
              value: params.html,
            },
            ...(params.text ? [{
              type: 'text/plain',
              value: params.text,
            }] : [])
          ],
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('SendGrid email error:', error);
      return false;
    }
  }
}

// Postmark Implementation
class PostmarkProvider implements EmailProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendEmail(params: EmailParams): Promise<boolean> {
    try {
      const response = await fetch('https://api.postmarkapp.com/email', {
        method: 'POST',
        headers: {
          'X-Postmark-Server-Token': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          From: params.from,
          To: params.to,
          Subject: params.subject,
          HtmlBody: params.html,
          TextBody: params.text || '',
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Postmark email error:', error);
      return false;
    }
  }
}

// Resend Implementation (modern alternative)
class ResendProvider implements EmailProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendEmail(params: EmailParams): Promise<boolean> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: params.from,
          to: [params.to],
          subject: params.subject,
          html: params.html,
          text: params.text,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Resend email error:', error);
      return false;
    }
  }
}

// Email service factory
export function createEmailProvider(): EmailProvider {
  const provider = process.env.EMAIL_PROVIDER || 'sendgrid';
  
  switch (provider.toLowerCase()) {
    case 'sendgrid':
      return new SendGridProvider(process.env.SENDGRID_API_KEY || '');
    case 'postmark':
      return new PostmarkProvider(process.env.POSTMARK_API_KEY || '');
    case 'resend':
      return new ResendProvider(process.env.RESEND_API_KEY || '');
    default:
      throw new Error(`Unsupported email provider: ${provider}`);
  }
}

// Email templates
export function generateContractorNotificationEmail(data: LeadNotificationData): { html: string; text: string; subject: string } {
  const subject = `New ${data.projectType} Lead in ${data.city} - ${data.homeownerName}`;
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead from TownKit</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .lead-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
    .detail-label { font-weight: bold; }
    .cta { background: #4f46e5; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Lead from TownKit</h1>
      <p>A homeowner in ${data.city} is looking for ${data.projectType.toLowerCase()} help</p>
    </div>
    
    <div class="content">
      <h2>Lead Details</h2>
      <div class="lead-details">
        <div class="detail-row">
          <span class="detail-label">Homeowner:</span>
          <span>${data.homeownerName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email:</span>
          <span>${data.email}</span>
        </div>
        ${data.phone ? `
        <div class="detail-row">
          <span class="detail-label">Phone:</span>
          <span>${data.phone}</span>
        </div>
        ` : ''}
        <div class="detail-row">
          <span class="detail-label">Project Type:</span>
          <span>${data.projectType}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Timeline:</span>
          <span>${data.timeline}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Budget:</span>
          <span>${data.budget}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Location:</span>
          <span>${data.city}</span>
        </div>
      </div>
      
      <h3>Project Description</h3>
      <div class="lead-details">
        <p>${data.projectDescription}</p>
      </div>
      
      <p><strong>Next Steps:</strong></p>
      <ol>
        <li>Contact the homeowner within 24 hours for best response rates</li>
        <li>Provide a detailed quote including permit handling if needed</li>
        <li>Follow up professionally and promptly</li>
      </ol>
      
      <a href="mailto:${data.email}?subject=Re: Your ${data.projectType} Project in ${data.city}" class="cta">Contact Homeowner</a>
    </div>
    
    <div class="footer">
      <p>This lead was generated through TownKit.com</p>
      <p>For support, contact us at support@townkit.com</p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
New Lead from TownKit

Homeowner: ${data.homeownerName}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
Project Type: ${data.projectType}
Timeline: ${data.timeline}
Budget: ${data.budget}
Location: ${data.city}

Project Description:
${data.projectDescription}

Next Steps:
1. Contact the homeowner within 24 hours for best response rates
2. Provide a detailed quote including permit handling if needed
3. Follow up professionally and promptly

Reply to this email to contact the homeowner directly.

This lead was generated through TownKit.com
For support, contact us at support@townkit.com
  `;

  return { html, text, subject };
}

export function generateConfirmationEmail(data: ConfirmationEmailData): { html: string; text: string; subject: string } {
  const subject = `Your ${data.projectType} contractor request has been submitted`;
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contractor Request Confirmed</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #10b981; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .steps { background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .step { display: flex; margin: 10px 0; }
    .step-number { background: #3b82f6; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Request Submitted Successfully</h1>
      <p>We're finding ${data.projectType.toLowerCase()} contractors in ${data.city}</p>
    </div>
    
    <div class="content">
      <div class="info-box">
        <h2>Hi ${data.homeownerName}!</h2>
        <p>Thank you for using TownKit to find contractors for your ${data.projectType.toLowerCase()} project in ${data.city}.</p>
        <p><strong>Submitted:</strong> ${data.submittedAt}</p>
      </div>
      
      <div class="steps">
        <h3>What happens next:</h3>
        <div class="step">
          <div class="step-number">1</div>
          <div>
            <strong>Contractor Matching (Next 2 hours)</strong><br>
            We're reviewing your project and finding the best contractor matches in ${data.city}.
          </div>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <div>
            <strong>Contact from Contractors (24-48 hours)</strong><br>
            Up to 4 pre-screened contractors will reach out to discuss your project and provide quotes.
          </div>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <div>
            <strong>Compare and Choose</strong><br>
            Review quotes, ask questions, and select the contractor that's the best fit for your project.
          </div>
        </div>
        <div class="step">
          <div class="step-number">4</div>
          <div>
            <strong>Project Success</strong><br>
            Your chosen contractor will handle permits and construction, keeping you informed throughout.
          </div>
        </div>
      </div>
      
      <div class="info-box">
        <h3>Questions?</h3>
        <p>Our team is here to help ensure you have a great experience.</p>
        <p>📧 Email: <a href="mailto:help@townkit.com">help@townkit.com</a></p>
        <p>📞 Phone: (555) 123-4567</p>
      </div>
    </div>
    
    <div class="footer">
      <p>TownKit - Making home improvement easier</p>
      <p><a href="https://townkit.com">Visit TownKit.com</a> | <a href="mailto:help@townkit.com">Support</a></p>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
✓ Request Submitted Successfully

Hi ${data.homeownerName}!

Thank you for using TownKit to find contractors for your ${data.projectType.toLowerCase()} project in ${data.city}.

Submitted: ${data.submittedAt}

What happens next:

1. Contractor Matching (Next 2 hours)
   We're reviewing your project and finding the best contractor matches in ${data.city}.

2. Contact from Contractors (24-48 hours)
   Up to 4 pre-screened contractors will reach out to discuss your project and provide quotes.

3. Compare and Choose
   Review quotes, ask questions, and select the contractor that's the best fit for your project.

4. Project Success
   Your chosen contractor will handle permits and construction, keeping you informed throughout.

Questions?
Our team is here to help ensure you have a great experience.

Email: help@townkit.com
Phone: (555) 123-4567

TownKit - Making home improvement easier
Visit TownKit.com | Support: help@townkit.com
  `;

  return { html, text, subject };
}

// Main email sending functions
export async function sendContractorNotification(data: LeadNotificationData): Promise<boolean> {
  try {
    const emailProvider = createEmailProvider();
    const emailContent = generateContractorNotificationEmail(data);
    
    return await emailProvider.sendEmail({
      to: data.contractorEmail,
      from: process.env.EMAIL_FROM || 'noreply@townkit.com',
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });
  } catch (error) {
    console.error('Error sending contractor notification:', error);
    return false;
  }
}

export async function sendConfirmationEmail(data: ConfirmationEmailData, email: string): Promise<boolean> {
  try {
    const emailProvider = createEmailProvider();
    const emailContent = generateConfirmationEmail(data);
    
    return await emailProvider.sendEmail({
      to: email,
      from: process.env.EMAIL_FROM || 'noreply@townkit.com',
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
}