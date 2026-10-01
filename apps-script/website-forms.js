/**
 * Steve's IT Pro — Website Forms Backend
 *
 * Receives the three forms on stevesitpro.com and makes sure every lead
 * reaches Steve:
 *   - Homepage "Send a message"        (source: "stevesitpro.com")
 *   - /book/ "Request a Call"          (source: "booking-page")
 *   - /free-checklist/ checklist form  (source: "security-checklist-lead-magnet")
 *
 * For each submission it:
 *   1. Logs the lead to the CRM sheet (Pipeline tab, or Checklist Leads for the checklist)
 *   2. Emails Steve, with Reply-To set to the lead
 *   3. Emails the lead: the checklist link, or a short "got it" confirmation
 * and replies { ok: true } so the website only says "sent" when it really was.
 *
 * SET UP (about 5 minutes, do this from steve@stevesitpro.com so emails come from that address):
 *   1. Open the CRM sheet ("Steve's IT Pro — CRM Pipeline Sheet Setup").
 *   2. Extensions → Apps Script. Add a new file, paste this whole file in, and save.
 *      (It can sit next to the other scripts in that project.)
 *   3. Choose the function testSetup in the toolbar and click Run. Approve the permissions.
 *      You should receive a test "New website lead" email and see a TEST row in the sheet.
 *   4. Deploy → New deployment → type: Web app.
 *        Execute as: Me    Who has access: Anyone
 *      Click Deploy and copy the Web app URL (ends in /exec).
 *   5. Give that URL to whoever updates the website (it goes in three places).
 *
 * Changing this code later: Deploy → Manage deployments → edit (pencil) →
 * Version: New version → Deploy. The URL stays the same that way.
 */

const FORMS = {
  ownerEmail: "steve@stevesitpro.com",
  senderName: "Steve Moynihan — Steve's IT Pro",
  checklistUrl: "https://stevesitpro.com/free-checklist/google-workspace-security-checklist.pdf",
  bookingUrl: "https://stevesitpro.com/book/",
  pipelineTab: "Pipeline",
  checklistTab: "Checklist Leads",
};

// ============================================================
// WEB APP ENTRY POINT
// ============================================================
function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (data.website || data.hp) return json_({ ok: true }); // honeypot: pretend success to bots

    const lead = {
      name: clean_(data.name, 120),
      email: clean_(data.email, 200).toLowerCase(),
      company: clean_(data.company, 200),
      message: clean_(data.message, 5000),
      source: clean_(data.source, 80) || "website",
    };

    if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      return json_({ ok: false, error: "Please enter your name and a valid email address." });
    }

    const isChecklist = lead.source === "security-checklist-lead-magnet";
    const errors = [];

    // Each step is independent, so one failure doesn't lose the lead.
    try {
      if (isChecklist) logChecklistLead_(lead);
      else logPipelineLead_(lead);
    } catch (err) { errors.push("CRM: " + err.message); }

    try { notifyOwner_(lead, errors); } catch (err) { errors.push("Notify: " + err.message); }

    try {
      if (isChecklist) sendChecklistEmail_(lead);
      else sendConfirmationEmail_(lead);
    } catch (err) { errors.push("Lead email: " + err.message); }

    if (errors.length) console.error("Website form issues:", errors.join(" | "), JSON.stringify(lead));

    // The owner notification is the one thing that must work.
    const notified = !errors.some((x) => x.indexOf("Notify:") === 0);
    return json_(notified ? { ok: true } : { ok: false, error: "Could not send. Please email steve@stevesitpro.com." });
  } catch (err) {
    console.error("doPost failed:", err);
    return json_({ ok: false, error: "Could not send. Please email steve@stevesitpro.com." });
  }
}

// Visiting the URL in a browser shows this, which confirms the deployment is live.
function doGet() {
  return json_({ ok: true, service: "stevesitpro website forms" });
}

// ============================================================
// CRM LOGGING
// ============================================================
function sourceLabel_(source) {
  if (source === "booking-page") return "Website: Book a Call";
  if (source === "security-checklist-lead-magnet") return "Website: Checklist";
  return "Website: Contact Form";
}

function logPipelineLead_(lead) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(FORMS.pipelineTab);
  if (!sheet) throw new Error('No "' + FORMS.pipelineTab + '" tab');
  sheet.appendRow([
    new Date(),            // A: Date
    lead.name,             // B: Name
    lead.email,            // C: Email
    lead.company || "—",   // D: Company
    lead.message,          // E: Message
    "New Lead",            // F: Stage
    "",                    // G: Package Interest
    "",                    // H: Value
    sourceLabel_(lead.source), // I: Source
    "",                    // J: Drive Folder
    "",                    // K: Notes
    "",                    // L: Next Follow-up
  ]);
}

function logChecklistLead_(lead) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(FORMS.checklistTab);
  if (!sheet) throw new Error('No "' + FORMS.checklistTab + '" tab');
  // Columns match runNurtureSequence(): A Date, B Name, C Email, D Source, E Converted?, F Emails Sent
  sheet.appendRow([new Date(), lead.name, lead.email, "Website: Checklist", "No", 0]);
}

// ============================================================
// EMAILS
// ============================================================
function notifyOwner_(lead, errors) {
  const label = sourceLabel_(lead.source);
  const lines = [
    "New lead from stevesitpro.com (" + label + ")",
    "",
    "Name: " + lead.name,
    "Email: " + lead.email,
    "Company: " + (lead.company || "Not provided"),
  ];
  if (lead.message) lines.push("", "Message:", lead.message);
  if (errors.length) lines.push("", "Heads up, part of the automation failed:", errors.join("\n"));
  lines.push("", "Reply to this email to answer them directly.", "CRM: " + SpreadsheetApp.getActive().getUrl());

  MailApp.sendEmail({
    to: FORMS.ownerEmail,
    subject: "New website lead: " + lead.name + (lead.company ? " (" + lead.company + ")" : "") + " · " + label,
    body: lines.join("\n"),
    replyTo: lead.email,
    name: "stevesitpro.com",
  });
}

function sendChecklistEmail_(lead) {
  const first = lead.name.split(/\s+/)[0];
  const body =
    "Hi " + first + ",\n\n" +
    "Here's the Google Workspace Security Checklist you asked for:\n" +
    FORMS.checklistUrl + "\n\n" +
    "It's the same 15-point audit I run with every new client. Start with the items marked " +
    "\"Fix now\". They cover the most serious risks and take about 10 minutes.\n\n" +
    "If you'd like a second pair of eyes, I offer a free 30-minute review where we go through " +
    "your settings together: " + FORMS.bookingUrl + "\n\n" +
    "Or just reply to this email with any questions.\n\n" +
    "Steve Moynihan\nSteve's IT Pro · stevesitpro.com";

  const html =
    "<p>Hi " + esc_(first) + ",</p>" +
    "<p>Here's the Google Workspace Security Checklist you asked for:</p>" +
    '<p><a href="' + FORMS.checklistUrl + '" style="display:inline-block;background:#10b981;color:#020817;' +
    'padding:10px 18px;border-radius:8px;font-weight:bold;text-decoration:none">Download the checklist (PDF)</a></p>' +
    "<p>It's the same 15-point audit I run with every new client. Start with the items marked " +
    "<b>Fix now</b>. They cover the most serious risks and take about 10 minutes.</p>" +
    '<p>If you\'d like a second pair of eyes, I offer a <a href="' + FORMS.bookingUrl + '">free 30-minute review</a> ' +
    "where we go through your settings together. Or just reply to this email with any questions.</p>" +
    "<p>Steve Moynihan<br>Steve's IT Pro · <a href=\"https://stevesitpro.com\">stevesitpro.com</a></p>";

  MailApp.sendEmail({
    to: lead.email,
    subject: "Your Google Workspace Security Checklist",
    body: body,
    htmlBody: html,
    name: FORMS.senderName,
    replyTo: FORMS.ownerEmail,
  });
}

function sendConfirmationEmail_(lead) {
  const first = lead.name.split(/\s+/)[0];
  const isBooking = lead.source === "booking-page";
  const body =
    "Hi " + first + ",\n\n" +
    (isBooking
      ? "Thanks for requesting a discovery call. I'll reply within one business day with a few times that work.\n\n"
      : "Thanks for your message. I'll get back to you within one business day.\n\n") +
    (lead.message ? "For reference, here's what you sent:\n\n" + lead.message + "\n\n" : "") +
    "If anything is urgent, just reply to this email.\n\n" +
    "Steve Moynihan\nSteve's IT Pro · stevesitpro.com";

  MailApp.sendEmail({
    to: lead.email,
    subject: isBooking ? "Got your call request — Steve's IT Pro" : "Got your message — Steve's IT Pro",
    body: body,
    name: FORMS.senderName,
    replyTo: FORMS.ownerEmail,
  });
}

// ============================================================
// HELPERS
// ============================================================
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function clean_(value, maxLen) {
  return String(value == null ? "" : value).trim().slice(0, maxLen);
}

function esc_(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ============================================================
// TEST — run once from the editor after pasting (step 3 above)
// ============================================================
function testSetup() {
  const res = doPost({
    postData: {
      contents: JSON.stringify({
        name: "TEST Lead",
        email: FORMS.ownerEmail,
        company: "Test Co",
        message: "Test submission from testSetup(). Delete this row.",
        source: "stevesitpro.com",
      }),
    },
  });
  Logger.log(res.getContent());
}
