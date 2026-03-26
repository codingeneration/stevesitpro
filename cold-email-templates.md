# Cold Email Outreach Templates for Steve's IT Pro
## Target: Small businesses (5-50 employees) using Google Workspace

---

## How to Find Prospects

**Method 1: MX Record Lookup**
Businesses using Google Workspace have MX records pointing to google.com. Use tools like:
- Hunter.io — find emails by company domain
- Apollo.io — filter by company size + tech stack (Google Workspace)
- BuiltWith — find sites using Google Workspace

**Method 2: Job Boards**
Search for companies posting jobs that mention "Google Workspace" or "G Suite" — they're actively using it and likely growing.

**Method 3: Local Business Directories**
Search Google Maps for small businesses in your target metros. Check their website for @gmail.com addresses (they need to upgrade) or custom domains (check MX records).

**Target profile:**
- 5-50 employees
- Using Google Workspace (or should be)
- No dedicated IT staff
- Industries: marketing agencies, law firms, real estate, consulting firms, healthcare practices, construction companies

---

## Email 1: The Security Angle
**Subject:** Quick question about [Company Name]'s email security

Hi [First Name],

I ran a quick public check on [company domain] and noticed your domain doesn't have DMARC configured. That means anyone can send emails that look like they're coming from your domain — your clients would have no way to tell the difference.

It's a 30-minute fix, but most small businesses don't know about it until something goes wrong.

I'm a Google Workspace consultant and I do a free 15-minute email security check for small businesses. No pitch, no commitment — I just tell you what's misconfigured and how to fix it.

Want me to send over your results?

Steve Moynihan
Steve's IT Pro — Google Workspace Consulting
stevesitpro.com

---

## Email 2: The Cost/Efficiency Angle
**Subject:** That manual process your team runs every week

Hi [First Name],

Most small businesses I work with have at least one process that looks like this: someone copies data from a Google Form into a Sheet, formats it, sends an email, and updates a tracker. Every week. Takes 2-3 hours.

I build Google Apps Script automations that make those processes run themselves — no monthly software fees, no new tools to learn. Just a script that runs inside your existing Google Workspace.

If your team is doing any repetitive work in Sheets, Forms, or Gmail, I'd be happy to do a quick 15-minute call to see if it's automatable. No cost, no commitment.

Steve Moynihan
Steve's IT Pro — Google Workspace Consulting
stevesitpro.com

---

## Email 3: The "Just Noticed" Angle
**Subject:** Noticed something about your Google Workspace setup

Hi [First Name],

I was looking at [Company Name]'s online presence and noticed you're running on Google Workspace. Quick question — do you have someone managing your admin console, or is it kind of on autopilot?

I ask because most small businesses set up Workspace, add their team, and never touch the security settings. That leaves gaps that are easy to fix but expensive to ignore (email spoofing, data loss when employees leave, overshared files, etc.).

I do a free 30-minute Workspace health check for small businesses. I look at your security settings, email authentication, and file sharing policies and tell you exactly what needs attention. No strings attached.

Worth a quick call?

Steve Moynihan
Steve's IT Pro — Google Workspace Consulting
stevesitpro.com

---

## Follow-Up Email (send 3-4 days after no reply)
**Subject:** Re: [original subject]

Hi [First Name],

Just bumping this up — I know inboxes get busy.

If the full call doesn't work, I'm happy to just run the email security check on [company domain] and send you the results in an email. Takes me 5 minutes and might save you a headache down the road.

Just reply "sure" and I'll send it over.

Steve

---

## Follow-Up Email 2 (send 5-7 days after follow-up 1)
**Subject:** Last one from me

Hi [First Name],

I'll keep this short — if your Google Workspace is running smoothly and you've got email auth and security handled, that's great. No need to reply.

But if it's one of those things on the "I should probably look at that" list, my free security check is always available: stevesitpro.com

Either way, hope business is going well.

Steve

---

## Rules for Cold Email

1. **Personalize the first line** — mention their company name, industry, or something specific
2. **Never send more than 3 emails total** per prospect (initial + 2 follow-ups)
3. **Send Tuesday-Thursday, 8-10am** in their time zone
4. **Keep volume under 50/day** to avoid spam filters
5. **Use a separate sending domain** — don't send cold emails from stevesitpro.com
   - Buy something like steveitconsulting.com and set up Google Workspace on it
   - This protects your main domain's sender reputation
6. **Always include an unsubscribe line** (required by CAN-SPAM)
7. **Track opens and replies** with a tool like Instantly.ai, Lemlist, or Smartlead

## How to Verify DMARC Before Emailing (to personalize Email 1)

Run this command to check any domain:
```
dig _dmarc.theirdomain.com TXT
```

If it returns nothing, they don't have DMARC configured — that's your opening.

You can also use: https://mxtoolbox.com/dmarc.aspx
