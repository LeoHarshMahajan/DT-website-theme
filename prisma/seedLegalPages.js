const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ─── PRIVACY POLICY ────────────────────────────────────────────────────────
const privacyContent = `
<p><strong>Effective Date:</strong> July 4, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> July 4, 2026</p>
<p>Digital Triangle ("we", "us", "our") is a performance marketing and AI growth agency. This Privacy Policy explains how we collect, use, store, and protect information when you visit <a href="https://thedigitaltriangle.com">thedigitaltriangle.com</a> or engage with us through any of our contact channels. By using this website, you consent to the practices described here.</p>

<h2>1. Who We Are</h2>
<p>Digital Triangle is a marketing technology company that delivers AI-powered growth systems for brands — spanning performance advertising, organic SEO &amp; AEO, AI creative production, content strategy, B2B demand generation, and CRM automation. Our registered correspondence address is available on request at <a href="mailto:team@digitaltriangle.in">team@digitaltriangle.in</a>.</p>

<h2>2. Information We Collect</h2>
<p>We collect information only when you actively provide it to us or when it is necessary to serve this website to you.</p>
<h3>Information You Provide</h3>
<ul>
  <li><strong>Contact &amp; Inquiry Forms:</strong> When you fill out the contact form, request a free growth audit, or book a consultation, we collect your name, email address, phone number, company name, website URL, approximate marketing budget, selected services of interest, business goals, and any message you include. This information is stored securely to allow us to respond to your inquiry and assess fit.</li>
  <li><strong>Newsletter Subscription:</strong> If you subscribe to our newsletter, we collect your email address solely to send you marketing insights, campaign case studies, and company updates. You can unsubscribe at any time via the link in any email we send you.</li>
</ul>
<h3>Information Collected Automatically</h3>
<ul>
  <li><strong>Page Views &amp; Access Logs:</strong> Our servers automatically log the pages you visit, the time and date of your visit, your browser type, operating system, referring URL, and approximate geographic region (derived from IP address). We use this to understand how our website performs and to improve content.</li>
  <li><strong>Cookies &amp; Similar Technologies:</strong> We use cookies to maintain session state and to understand website usage. Please refer to our <a href="/pages/cookie-policy">Cookie Policy</a> for full details.</li>
</ul>
<p>We do not collect payment card data, government identification numbers, or any sensitive personal information through this website.</p>

<h2>3. How We Use Your Information</h2>
<ul>
  <li><strong>To respond to inquiries</strong> — we use your contact form submission to evaluate your marketing needs and send you a response or schedule a conversation.</li>
  <li><strong>To deliver the newsletter</strong> — we send periodic marketing and industry content to subscribers who have opted in.</li>
  <li><strong>To improve our website</strong> — aggregated page view data helps us understand which content is valuable and where visitors encounter friction.</li>
  <li><strong>To fulfil legal obligations</strong> — if required by applicable Indian law, we may process or disclose your data to comply with government or regulatory orders.</li>
</ul>
<p>We do not sell, rent, or trade your personal information to third parties for their marketing purposes.</p>

<h2>4. Lawful Basis for Processing</h2>
<p>We process personal data under the following grounds recognised by the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000:</p>
<ul>
  <li><strong>Consent</strong> — you provide explicit consent when submitting a contact form or subscribing to our newsletter.</li>
  <li><strong>Legitimate Interest</strong> — we have a legitimate business interest in understanding website performance via anonymised analytics logs.</li>
  <li><strong>Legal Obligation</strong> — where disclosure is required by Indian law, regulation, or court order.</li>
</ul>

<h2>5. Third-Party Services We Use</h2>
<p>We use a limited set of trusted third-party services to operate this website. Each acts as a data processor on our behalf and is bound by appropriate data processing agreements.</p>
<ul>
  <li><strong>Supabase (Supabase Inc.)</strong> — Cloud-hosted PostgreSQL database. All form submissions, subscriber records, and page data are stored in Supabase. Data is stored in AWS ap-southeast-2 (Singapore region). <a href="https://supabase.com/privacy" target="_blank" rel="noopener">Privacy Policy</a>.</li>
  <li><strong>Resend (Resend Inc.)</strong> — Transactional email delivery. When you contact us or subscribe, any automated email responses are routed through Resend. We do not share your data with Resend beyond what is necessary for delivery. <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>.</li>
  <li><strong>Hostinger (Hostinger International UAB)</strong> — Web hosting infrastructure. Your browser connects to Hostinger servers to receive this website. Hostinger may process standard HTTP access logs. <a href="https://www.hostinger.com/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>.</li>
</ul>
<p>If we add additional third-party integrations that affect how your data is processed, we will update this policy and, where required by law, seek fresh consent.</p>

<h2>6. Data Retention</h2>
<ul>
  <li><strong>Lead / inquiry data</strong> — retained for up to 3 years to track engagement history and fulfil service obligations, unless you request earlier deletion.</li>
  <li><strong>Newsletter subscriber records</strong> — retained until you unsubscribe. After unsubscription, your email is removed within 30 days.</li>
  <li><strong>Access logs</strong> — retained for up to 90 days and then automatically purged.</li>
</ul>

<h2>7. Your Rights Under the DPDP Act 2023</h2>
<p>As a data principal under India's Digital Personal Data Protection Act, 2023, you have the following rights:</p>
<ul>
  <li><strong>Right to Access</strong> — request a summary of personal data we hold about you.</li>
  <li><strong>Right to Correction</strong> — request correction of inaccurate or incomplete data.</li>
  <li><strong>Right to Erasure</strong> — request deletion of your personal data, subject to our legal retention obligations.</li>
  <li><strong>Right to Grievance Redressal</strong> — raise a complaint with us if you believe your data has been mishandled. We will respond within 30 days.</li>
  <li><strong>Right to Nominate</strong> — nominate another person to exercise these rights on your behalf in the event of your incapacity.</li>
</ul>
<p>To exercise any of these rights, email us at <a href="mailto:team@digitaltriangle.in">team@digitaltriangle.in</a> with the subject line "Data Privacy Request". We will acknowledge your request within 72 hours and respond substantively within 30 days.</p>

<h2>8. Data Security</h2>
<p>We use industry-standard safeguards: encrypted database connections (TLS), bcrypt password hashing, role-based access controls, and access restricted to authorised personnel only. No transmission over the internet is 100% secure, so while we take every reasonable measure, we cannot guarantee absolute security.</p>

<h2>9. Children's Data</h2>
<p>This website is not directed at individuals under the age of 18. We do not knowingly collect personal data from minors. If you believe a minor has submitted data through our website, contact us immediately at <a href="mailto:team@digitaltriangle.in">team@digitaltriangle.in</a> and we will delete it promptly.</p>

<h2>10. Changes to This Policy</h2>
<p>We may update this Privacy Policy as our services evolve or as legal requirements change. Material changes will be indicated by a revised "Last Updated" date at the top. We encourage you to review this page periodically. Continued use of the website after a change constitutes acceptance of the updated policy.</p>

<h2>11. Contact Us</h2>
<p>For any privacy-related questions, requests, or complaints:</p>
<ul>
  <li><strong>Email:</strong> <a href="mailto:team@digitaltriangle.in">team@digitaltriangle.in</a></li>
  <li><strong>Website:</strong> <a href="https://thedigitaltriangle.com/contact">thedigitaltriangle.com/contact</a></li>
</ul>
<p>We aim to respond to all privacy-related correspondence within 3 business days.</p>
`;

// ─── TERMS OF SERVICE ──────────────────────────────────────────────────────
const termsContent = `
<p><strong>Effective Date:</strong> July 4, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> July 4, 2026</p>
<p>These Terms of Service ("Terms") govern your use of the website <a href="https://thedigitaltriangle.com">thedigitaltriangle.com</a> and the marketing services provided by Digital Triangle ("Digital Triangle", "we", "us"). By accessing this website or engaging our services, you agree to these Terms in full. If you do not agree, please do not use this website or engage our services.</p>

<h2>1. About Digital Triangle</h2>
<p>Digital Triangle is a performance marketing and AI growth agency that designs and executes full-funnel growth systems for brands. Our service offerings include — but are not limited to — paid performance advertising (Meta, Google, Amazon), search engine optimisation (SEO), answer engine optimisation (AEO), AI-powered creative production, content strategy and execution, B2B demand generation, LinkedIn marketing, and CRM &amp; marketing automation.</p>

<h2>2. Website Use</h2>
<p>This website is operated for informational and lead generation purposes. You may browse, share, and contact us through it for legitimate business purposes. You agree not to:</p>
<ul>
  <li>Attempt to gain unauthorised access to any part of the website or its underlying infrastructure.</li>
  <li>Submit false, misleading, or fraudulent information through any form on this website.</li>
  <li>Use automated scripts, bots, or crawlers to scrape content from this website without prior written permission.</li>
  <li>Reproduce, republish, or redistribute any content from this website — including case studies, strategic frameworks, and performance data — without our explicit written consent.</li>
  <li>Use this website in any manner that violates applicable Indian or international law.</li>
</ul>

<h2>3. Service Engagement</h2>
<p>Engagement of Digital Triangle's marketing services is governed by a separate Statement of Work (SOW) or Service Agreement signed between the parties. These Terms are supplementary to and do not replace that agreement. In the event of any conflict between these Terms and a signed Service Agreement, the Service Agreement takes precedence.</p>
<p>Submitting a contact form or booking a consultation does not constitute a service contract. A binding engagement begins only when both parties have signed a formal agreement.</p>

<h2>4. No Guarantee of Results</h2>
<p>Marketing performance is influenced by a complex combination of market conditions, platform algorithm changes, competitive dynamics, product quality, and audience behaviour — many of which are outside our direct control. While we design strategies grounded in data and deploy proven AI-powered systems, we do not guarantee specific outcomes such as a defined ROAS, a particular CAC reduction, or a revenue growth multiple.</p>
<p>All case study results published on this website represent actual client outcomes for those specific engagements under the conditions of that time. They are not a warranty or representation that equivalent results will be achieved for any new client.</p>

<h2>5. Client Obligations</h2>
<p>Where we are engaged to deliver marketing services, the client agrees to:</p>
<ul>
  <li>Provide timely access to required ad accounts, analytics platforms, CRM systems, and creative assets.</li>
  <li>Ensure all products, services, and claims in marketing materials comply with applicable laws and platform policies (Meta, Google, Amazon, etc.).</li>
  <li>Not make unauthorised modifications to live campaigns or automations without informing our team, as this can cause data inconsistency or campaign disruption.</li>
  <li>Pay all invoices by the due date specified in the signed agreement. Delayed payment beyond 15 days may result in pausing of active campaign management.</li>
</ul>

<h2>6. Intellectual Property</h2>
<p><strong>Client Data:</strong> All data you provide to us — including brand assets, customer lists, CRM data, and audience lists — remains your property at all times. We will use it only as instructed and in accordance with our Privacy Policy.</p>
<p><strong>Digital Triangle's Frameworks:</strong> Proprietary methodologies, AI system architectures, internal playbooks, reporting frameworks, and creative templates developed by Digital Triangle remain our intellectual property. They are licensed to clients for use within the scope of the engagement but may not be reproduced, sublicensed, or shared with third parties.</p>
<p><strong>Deliverables:</strong> Campaign creative, ad copies, content pieces, and other deliverables produced specifically for a client become the client's property upon full settlement of all outstanding invoices related to that engagement.</p>

<h2>7. Confidentiality</h2>
<p>Both parties agree to treat as confidential any non-public information shared during the course of an engagement — including commercial strategies, financial data, proprietary methodologies, and client lists. This obligation survives the termination of any service agreement for a period of 2 years, unless the information enters the public domain through no fault of either party.</p>

<h2>8. Third-Party Platforms and Ad Spend</h2>
<p>Digital Triangle acts as a manager and strategist on third-party advertising platforms (Meta, Google, Amazon, LinkedIn, etc.). Advertising spend placed on these platforms is transacted directly through the client's ad account or billed as a pass-through. We do not mark up media spend unless explicitly stated in the signed agreement. We are not liable for platform outages, policy enforcement actions, account suspensions, or algorithm changes that affect campaign performance.</p>

<h2>9. Limitation of Liability</h2>
<p>To the maximum extent permitted by applicable Indian law, Digital Triangle's total liability to you for any claim arising out of or related to these Terms or our services — whether in contract, tort, or otherwise — shall not exceed the total fees paid by you to Digital Triangle in the 3 months preceding the claim.</p>
<p>We shall not be liable for any indirect, incidental, consequential, or punitive damages, including loss of revenue, loss of data, loss of business opportunity, or reputational harm, even if we have been advised of the possibility of such damages.</p>

<h2>10. Termination</h2>
<p>Either party may terminate a service engagement in accordance with the notice period specified in the signed Service Agreement. Digital Triangle reserves the right to terminate or suspend website access or service delivery if you breach these Terms or any signed agreement and fail to remedy the breach within 7 days of written notice.</p>

<h2>11. Governing Law and Dispute Resolution</h2>
<p>These Terms are governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these Terms — including questions regarding their existence, validity, or termination — shall first be attempted to be resolved through good-faith negotiation between the parties. If not resolved within 30 days, disputes shall be subject to the exclusive jurisdiction of the courts in India.</p>

<h2>12. Changes to These Terms</h2>
<p>We may revise these Terms at any time. Material changes will be reflected by an updated "Last Updated" date. Your continued use of this website or our services after changes are posted constitutes your acceptance of the revised Terms. For significant changes, we will attempt to notify active clients directly.</p>

<h2>13. Contact</h2>
<p>For any questions about these Terms:</p>
<ul>
  <li><strong>Email:</strong> <a href="mailto:team@digitaltriangle.in">team@digitaltriangle.in</a></li>
  <li><strong>Website:</strong> <a href="https://thedigitaltriangle.com/contact">thedigitaltriangle.com/contact</a></li>
</ul>
`;

// ─── COOKIE POLICY ─────────────────────────────────────────────────────────
const cookieContent = `
<p><strong>Effective Date:</strong> July 4, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> July 4, 2026</p>
<p>This Cookie Policy explains how Digital Triangle ("we", "us", "our") uses cookies and similar tracking technologies on <a href="https://thedigitaltriangle.com">thedigitaltriangle.com</a>. It should be read alongside our <a href="/pages/privacy-policy">Privacy Policy</a>, which covers how we handle personal data more broadly.</p>

<h2>1. What Are Cookies?</h2>
<p>Cookies are small text files placed on your device by a website when you visit it. They allow the website to recognise your device on return visits and to remember certain information about your browsing session. Cookies are widely used to make websites work efficiently and to provide both website operators and visitors with useful information.</p>
<p>We also use related technologies such as local storage and session storage, which work similarly to cookies but store data differently in your browser.</p>

<h2>2. Types of Cookies We Use</h2>

<h3>Essential Cookies</h3>
<p>These cookies are necessary for the website to function correctly. They cannot be switched off in our systems. They are usually set only in response to actions you take — such as setting your preferences, logging in to the admin area, or filling in forms.</p>
<ul>
  <li><strong>Session cookies</strong> — maintain your login session in the password-protected admin area of this website. These expire when you close your browser.</li>
  <li><strong>CSRF protection tokens</strong> — protect form submissions from cross-site request forgery attacks. These are short-lived and tied to your browser session.</li>
  <li><strong>Theme preference</strong> — stores your light/dark mode preference so the site loads in your preferred theme on return visits. This is stored in your browser's local storage and is never transmitted to our servers.</li>
</ul>

<h3>Analytics Cookies</h3>
<p>We use anonymised server-side logging to understand how visitors use our website — which pages are visited most, where traffic originates from, and where visitors exit. This data is aggregated and cannot be used to identify you personally. No third-party analytics scripts (e.g., Google Analytics) are currently loaded on this website.</p>
<p>If we introduce a client-side analytics tool in the future, we will update this policy and, where required, seek your consent before placing analytics cookies.</p>

<h3>Marketing and Advertising Cookies</h3>
<p>As a marketing agency, we work closely with advertising platforms including Meta (Facebook/Instagram) and Google. If we deploy a Meta Pixel or Google Tag on this website to measure the performance of our own campaigns and to build lookalike audiences, those platforms may set their own first- and third-party cookies on your device.</p>
<p>Where such cookies are active, they may track:</p>
<ul>
  <li>Pages you visit on this website.</li>
  <li>Whether you submitted a contact form or took another conversion action.</li>
  <li>Your broader browsing behaviour across the web (subject to your browser and device settings and platform-level controls).</li>
</ul>
<p>These cookies are governed by the respective platform's own privacy and cookie policies:</p>
<ul>
  <li><a href="https://www.facebook.com/policy/cookies/" target="_blank" rel="noopener">Meta Cookie Policy</a></li>
  <li><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener">Google Cookie Policy</a></li>
</ul>

<h2>3. Cookies Set by Third-Party Services</h2>
<p>Our website infrastructure relies on a small number of third-party services. These services may set their own cookies or storage entries as part of delivering the website to you:</p>
<ul>
  <li><strong>Hostinger</strong> — our hosting provider may set technical cookies required for CDN functionality and load balancing. These are strictly necessary and expire at the end of your browsing session.</li>
</ul>
<p>We do not embed third-party widgets (social media feeds, YouTube players, chatbots, etc.) that would introduce additional cookie surfaces without your knowledge.</p>

<h2>4. Cookie Duration</h2>
<ul>
  <li><strong>Session cookies</strong> — deleted automatically when you close your browser tab or window.</li>
  <li><strong>Persistent cookies</strong> — remain on your device for a set period. For example, your theme preference is stored for up to 12 months. Marketing cookies set by Meta or Google may persist for up to 180 days, depending on platform settings.</li>
</ul>

<h2>5. How to Control Cookies</h2>
<p>You can control and manage cookies in several ways:</p>
<h3>Browser Settings</h3>
<p>All major browsers allow you to view, block, and delete cookies through their settings or preferences menu. Note that blocking essential cookies will prevent certain parts of the website from functioning correctly (for example, the admin login).</p>
<ul>
  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Chrome</a></li>
  <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener">Firefox</a></li>
  <li><a href="https://support.apple.com/en-in/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
  <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener">Microsoft Edge</a></li>
</ul>
<h3>Ad Platform Opt-Outs</h3>
<p>If you wish to opt out of interest-based advertising from Meta or Google, you can do so through their respective ad preference centres:</p>
<ul>
  <li><a href="https://www.facebook.com/adpreferences/" target="_blank" rel="noopener">Meta Ad Preferences</a></li>
  <li><a href="https://adssettings.google.com/" target="_blank" rel="noopener">Google Ads Settings</a></li>
</ul>

<h2>6. Your Rights</h2>
<p>Under the Digital Personal Data Protection Act, 2023, you have the right to withdraw consent for non-essential cookies at any time. To exercise this right, you can manage your browser settings as described above, or contact us and we will guide you through the process.</p>

<h2>7. Updates to This Policy</h2>
<p>We will update this Cookie Policy whenever we add, change, or remove cookies on this website. The "Last Updated" date at the top will reflect any revision. We recommend checking this page periodically if you have concerns about tracking.</p>

<h2>8. Contact Us</h2>
<p>If you have any questions about how we use cookies or wish to exercise your rights:</p>
<ul>
  <li><strong>Email:</strong> <a href="mailto:team@digitaltriangle.in">team@digitaltriangle.in</a></li>
  <li><strong>Website:</strong> <a href="https://thedigitaltriangle.com/contact">thedigitaltriangle.com/contact</a></li>
</ul>
`;

// ─── SEED ──────────────────────────────────────────────────────────────────
async function main() {
  const pages = [
    {
      slug: 'privacy-policy',
      title: 'Privacy Policy',
      content: privacyContent.trim(),
      metaTitle: 'Privacy Policy — Digital Triangle',
      metaDescription: 'How Digital Triangle collects, uses, stores, and protects your personal data. Compliant with India\'s DPDP Act 2023 and IT Act 2000.',
      isPublished: true,
    },
    {
      slug: 'terms-of-service',
      title: 'Terms of Service',
      content: termsContent.trim(),
      metaTitle: 'Terms of Service — Digital Triangle',
      metaDescription: 'Terms governing use of thedigitaltriangle.com and engagement of Digital Triangle\'s performance marketing and AI growth services.',
      isPublished: true,
    },
    {
      slug: 'cookie-policy',
      title: 'Cookie Policy',
      content: cookieContent.trim(),
      metaTitle: 'Cookie Policy — Digital Triangle',
      metaDescription: 'How Digital Triangle uses cookies and similar technologies on thedigitaltriangle.com — what we set, why, and how to control them.',
      isPublished: true,
    },
  ];

  for (const page of pages) {
    const result = await prisma.page.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        content: page.content,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        isPublished: page.isPublished,
      },
      create: page,
    });
    console.log(`✓ ${result.slug} (id: ${result.id})`);
  }

  console.log('\nAll 3 legal pages seeded successfully.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
