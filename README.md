# Steve's IT Pro

**Google Workspace consulting for small businesses** · [stevesitpro.com](https://stevesitpro.com)

This repository is the source for stevesitpro.com. It's public on purpose: it shows the same kind of work I do for clients, using the same tools I'd use on your Google Workspace.

## What's in here

**An AI assistant on the site.** The chat bubble answers visitor questions about services and Google Workspace. It runs on Anthropic's Claude through a small serverless backend ([`chatbot/`](chatbot/)) that checks requests come from this site, limits how many messages each visitor can send, and keeps the API key on the server.

**Google Apps Script automation.** [`apps-script/`](apps-script/) holds the intake workflow behind my own consult form. When someone submits it, a script sends a welcome email, creates a client folder in Google Drive, logs the lead to a pipeline sheet, and notifies me. A second script builds that pipeline sheet with its tabs, formatting and dropdowns. This is the same pattern I build for clients in an Automation Sprint.

**A fast, simple website.** A lightweight React homepage with plain HTML for the blog and service pages, hosted on GitHub Pages behind Cloudflare. There's no CMS or database to patch.

## Guides

Practical write-ups for small business owners and IT admins:

- [How to set up SPF, DKIM, and DMARC for Google Workspace](https://stevesitpro.com/blog/spf-dkim-dmarc-google-workspace.html)
- [Google Workspace security checklist for small business](https://stevesitpro.com/blog/google-workspace-security-checklist-small-business.html)
- [How to offboard an employee without losing data](https://stevesitpro.com/blog/employee-offboarding-google-workspace.html)
- [Shared Drive setup best practices](https://stevesitpro.com/blog/google-workspace-shared-drive-setup.html)
- [Apps Script vs. Zapier](https://stevesitpro.com/blog/apps-script-vs-zapier-google-workspace.html)
- [Google Workspace vs. Microsoft 365 for small business](https://stevesitpro.com/blog/google-workspace-vs-microsoft-365-small-business.html)

## Work with me

Fixed-price setup and automation packages, plus monthly support plans. See [pricing](https://stevesitpro.com/#pricing).

- **Free 30-minute consult:** [book a time](https://docs.google.com/forms/d/e/1FAIpQLScGj_hocIEBDevsfLjQlSHTX74xX78hrLmz2TUejaFRTTBkvQ/viewform?usp=header)
- **Email:** steve@stevesitpro.com
- **About me:** [stevemoynihan.com](https://stevemoynihan.com)
