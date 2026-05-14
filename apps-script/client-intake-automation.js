/**
 * Steve's IT Pro — Client Intake Automation
 *
 * WHAT THIS DOES:
 * When someone submits your Google intake form, this script automatically:
 * 1. Sends them a branded welcome email
 * 2. Creates a client folder in your Google Drive
 * 3. Logs the lead to your CRM pipeline sheet
 * 4. Sends you a Slack-style notification email
 *
 * HOW TO SET UP:
 * 1. Open your intake form's linked Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Update the CONFIG section below with your actual IDs
 * 5. Run the setUp() function once (it creates the form trigger)
 * 6. Authorize when prompted
 *
 * That's it. Every new form submission is now automated.
 */

// ============================================================
// CONFIG — Update these values
// ============================================================
const CONFIG = {
  // Your email
  ownerEmail: "steve@stevesitpro.com",

  // The Google Drive folder ID where client folders will be created
  // Find this in the URL when you open the folder: drive.google.com/drive/folders/THIS_PART
  clientsFolderId: "YOUR_CLIENTS_FOLDER_ID",

  // The Google Sheet ID for your CRM pipeline
  // Find this in the URL: docs.google.com/spreadsheets/d/THIS_PART/edit
  crmSheetId: "YOUR_CRM_SHEET_ID",

  // The sheet tab name in your CRM
  crmTabName: "Pipeline",

  // Your intake form field names (must match exactly)
  fields: {
    name: "Your name",
    email: "Email address",
    company: "Company (optional)",
    message: "What do you need help with?",
  },

  // Booking link
  bookingUrl: "https://docs.google.com/forms/d/e/1FAIpQLScGj_hocIEBDevsfLjQlSHTX74xX78hrLmz2TUejaFRTTBkvQ/viewform?usp=header",
};

// ============================================================
// SETUP — Run this once to create the trigger
// ============================================================
function setUp() {
  // Remove any existing triggers to avoid duplicates
  ScriptApp.getProjectTriggers().forEach((t) => ScriptApp.deleteTrigger(t));

  // Create trigger for form submissions
  ScriptApp.newTrigger("onFormSubmit")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();

  Logger.log("Trigger created successfully. Form submissions are now automated.");
}

// ============================================================
// MAIN — Runs on every form submission
// ============================================================
function onFormSubmit(e) {
  try {
    const responses = e.namedValues;
    const name = (responses[CONFIG.fields.name] || [""])[0].trim();
    const email = (responses[CONFIG.fields.email] || [""])[0].trim();
    const company = (responses[CONFIG.fields.company] || [""])[0].trim();
    const message = (responses[CONFIG.fields.message] || [""])[0].trim();
    const timestamp = new Date();

    if (!name || !email) {
      Logger.log("Missing name or email, skipping automation.");
      return;
    }

    // 1. Send welcome email to the lead
    sendWelcomeEmail(name, email);

    // 2. Create client folder in Drive
    const folderUrl = createClientFolder(name, company);

    // 3. Log to CRM pipeline
    logToCRM(timestamp, name, email, company, message, folderUrl);

    // 4. Notify Steve
    sendNotification(name, email, company, message);

    Logger.log(`Automation complete for: ${name} (${email})`);
  } catch (error) {
    Logger.log(`Error in onFormSubmit: ${error.message}`);
    // Still notify Steve even if something fails
    MailApp.sendEmail(
      CONFIG.ownerEmail,
      "Intake Automation Error",
      `Something went wrong processing a form submission.\n\nError: ${error.message}\n\nCheck the Apps Script logs for details.`
    );
  }
}

// ============================================================
// WELCOME EMAIL
// ============================================================
function sendWelcomeEmail(name, email) {
  const firstName = name.split(" ")[0];
  const subject = "Thanks for reaching out — here's what happens next";

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1e293b;">
      <div style="padding: 32px 0; border-bottom: 2px solid #10b981;">
        <strong style="color: #0f172a; font-size: 18px;">Steve's IT Pro</strong>
      </div>

      <div style="padding: 32px 0;">
        <p style="font-size: 16px; line-height: 1.7; margin: 0 0 16px;">Hi ${firstName},</p>

        <p style="font-size: 16px; line-height: 1.7; margin: 0 0 16px;">
          Thanks for reaching out. I've received your message and I'll personally review it within one business day.
        </p>

        <p style="font-size: 16px; line-height: 1.7; margin: 0 0 16px;">
          <strong>Here's what happens next:</strong>
        </p>

        <ol style="font-size: 15px; line-height: 1.8; margin: 0 0 24px; padding-left: 20px; color: #475569;">
          <li>I'll review your message and put together a few initial thoughts</li>
          <li>I'll reply with any clarifying questions or a proposed next step</li>
          <li>If it makes sense, we'll hop on a free 30-minute discovery call to scope things out</li>
        </ol>

        <p style="font-size: 16px; line-height: 1.7; margin: 0 0 24px;">
          If you'd like to skip straight to the call, you can book a time here:
        </p>

        <a href="${CONFIG.bookingUrl}" style="display: inline-block; background: #10b981; color: #ffffff; font-weight: 700; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-size: 15px;">
          Book a Free Discovery Call &rarr;
        </a>

        <p style="font-size: 16px; line-height: 1.7; margin: 24px 0 0;">
          Talk soon,<br>
          <strong>Steve Moynihan</strong><br>
          <span style="color: #64748b; font-size: 14px;">Steve's IT Pro — Google Workspace Consulting</span><br>
          <a href="https://stevesitpro.com" style="color: #10b981; font-size: 14px;">stevesitpro.com</a>
        </p>
      </div>
    </div>
  `;

  const plainBody = `Hi ${firstName},

Thanks for reaching out. I've received your message and I'll personally review it within one business day.

Here's what happens next:
1. I'll review your message and put together a few initial thoughts
2. I'll reply with any clarifying questions or a proposed next step
3. If it makes sense, we'll hop on a free 30-minute discovery call

Book a call directly: ${CONFIG.bookingUrl}

Talk soon,
Steve Moynihan
Steve's IT Pro — Google Workspace Consulting
stevesitpro.com`;

  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    name: "Steve Moynihan",
    replyTo: CONFIG.ownerEmail,
  });
}

// ============================================================
// CLIENT FOLDER
// ============================================================
function createClientFolder(name, company) {
  try {
    const parentFolder = DriveApp.getFolderById(CONFIG.clientsFolderId);
    const folderName = company
      ? `${company} — ${name}`
      : name;

    // Check if folder already exists
    const existing = parentFolder.getFoldersByName(folderName);
    if (existing.hasNext()) {
      return existing.next().getUrl();
    }

    const folder = parentFolder.createFolder(folderName);

    // Create standard subfolders
    folder.createFolder("Proposals");
    folder.createFolder("Deliverables");
    folder.createFolder("Communication");

    return folder.getUrl();
  } catch (error) {
    Logger.log(`Error creating folder: ${error.message}`);
    return "Folder creation failed — check clientsFolderId";
  }
}

// ============================================================
// CRM LOGGING
// ============================================================
function logToCRM(timestamp, name, email, company, message, folderUrl) {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.crmSheetId).getSheetByName(CONFIG.crmTabName);

    sheet.appendRow([
      timestamp,                    // A: Date
      name,                         // B: Name
      email,                        // C: Email
      company || "—",               // D: Company
      message,                      // E: Message
      "New Lead",                   // F: Stage
      "",                           // G: Package Interest
      "",                           // H: Value
      "Intake Form",                // I: Source
      folderUrl,                    // J: Drive Folder
      "",                           // K: Notes
      "",                           // L: Next Follow-up
    ]);
  } catch (error) {
    Logger.log(`Error logging to CRM: ${error.message}`);
  }
}

// ============================================================
// NOTIFICATION TO STEVE
// ============================================================
function sendNotification(name, email, company, message) {
  const subject = `New Lead: ${name}${company ? ` (${company})` : ""}`;

  const body = `New intake form submission:

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}

Message:
${message}

---
Reply directly to this email to respond to them.
CRM: https://docs.google.com/spreadsheets/d/${CONFIG.crmSheetId}/edit
`;

  MailApp.sendEmail({
    to: CONFIG.ownerEmail,
    subject: subject,
    body: body,
    replyTo: email, // Reply goes directly to the lead
  });
}

// ============================================================
// EMAIL NURTURE SEQUENCE
// For leads who download the security checklist
// ============================================================

/**
 * Run this function daily via a time-based trigger.
 * It checks the CRM for checklist leads and sends follow-up emails
 * on Day 2, Day 5, and Day 10 after download.
 */
function runNurtureSequence() {
  const sheet = SpreadsheetApp.openById(CONFIG.crmSheetId).getSheetByName("Checklist Leads");
  if (!sheet) return;

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const now = new Date();

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const email = row[2];       // Column C
    const name = row[1];        // Column B
    const signupDate = new Date(row[0]); // Column A
    const emailsSent = row[5] || 0;      // Column F: number of nurture emails sent

    const daysSinceSignup = Math.floor((now - signupDate) / (1000 * 60 * 60 * 24));

    if (emailsSent === 0 && daysSinceSignup >= 2) {
      sendNurtureEmail1(name, email);
      sheet.getRange(i + 1, 6).setValue(1);
    } else if (emailsSent === 1 && daysSinceSignup >= 5) {
      sendNurtureEmail2(name, email);
      sheet.getRange(i + 1, 6).setValue(2);
    } else if (emailsSent === 2 && daysSinceSignup >= 10) {
      sendNurtureEmail3(name, email);
      sheet.getRange(i + 1, 6).setValue(3);
    }
  }
}

function sendNurtureEmail1(name, email) {
  const firstName = name.split(" ")[0];
  MailApp.sendEmail({
    to: email,
    subject: "Did you get through the checklist?",
    body: `Hi ${firstName},

A couple days ago you downloaded the Google Workspace Security Checklist. I'm curious — how did your setup score?

Most businesses I work with have 3-4 of the 15 items configured. The most common gaps:

1. No DMARC record (anyone can spoof your domain)
2. 2-Step Verification not enforced (one leaked password = full access)
3. External file sharing wide open (files shared with "anyone with the link")

If you found gaps and aren't sure how to fix them, I do a free 30-minute security review where I look at your actual setup and walk you through exactly what to change.

No pitch, no commitment — just a straight answer.

Book a time: ${CONFIG.bookingUrl}

Steve
Steve's IT Pro`,
    name: "Steve Moynihan",
    replyTo: CONFIG.ownerEmail,
  });
}

function sendNurtureEmail2(name, email) {
  const firstName = name.split(" ")[0];
  MailApp.sendEmail({
    to: email,
    subject: "The #1 thing most businesses get wrong with Google Workspace",
    body: `Hi ${firstName},

Quick story: a client came to me after an employee resigned. They deleted the account that afternoon. The next Monday, the sales team realized that employee had the only copy of three active client proposals in their personal Drive.

Google can recover deleted accounts within 20 days — but only if you act fast, and the recovery isn't instant.

The fix is simple: use Shared Drives for company files, not personal My Drive. Files in Shared Drives belong to the organization, not the person. No transfer needed when someone leaves.

I wrote a full guide on this: https://stevesitpro.com/blog/google-workspace-shared-drive-setup.html

If you want help setting up Shared Drives properly (structure, permissions, naming conventions), that's included in the Starter Setup package ($749). Or just reply to this email with questions — happy to help.

Steve
Steve's IT Pro`,
    name: "Steve Moynihan",
    replyTo: CONFIG.ownerEmail,
  });
}

function sendNurtureEmail3(name, email) {
  const firstName = name.split(" ")[0];
  MailApp.sendEmail({
    to: email,
    subject: "One last thing",
    body: `Hi ${firstName},

This is the last automated email you'll get from me — I don't believe in endless drip campaigns.

Here's the quick version of everything I offer:

- Starter Setup ($749) — Workspace config, email auth, Shared Drives, 2 hrs coaching
- Automation Sprint ($1,499) — Custom Apps Script workflow, delivered in 1-2 weeks
- Pro Support ($799/mo) — Up to 8 hrs/month on-demand support
- Free discovery call — 30 minutes, no commitment

If any of that is relevant now or in the future, I'm always here: steve@stevesitpro.com

And if you just want to keep learning, the blog has practical guides: https://stevesitpro.com/blog/

Thanks for downloading the checklist. Hope it helped.

Steve
Steve's IT Pro`,
    name: "Steve Moynihan",
    replyTo: CONFIG.ownerEmail,
  });
}

/**
 * Set up the daily nurture trigger.
 * Run this once manually.
 */
function setUpNurtureTrigger() {
  ScriptApp.newTrigger("runNurtureSequence")
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();

  Logger.log("Nurture sequence trigger created. Runs daily at 9 AM.");
}
