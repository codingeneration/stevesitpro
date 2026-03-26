/**
 * Steve's IT Pro — CRM Pipeline Sheet Setup
 *
 * HOW TO USE:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code and run createCRM()
 * 4. It will set up all the tabs, headers, formatting, and dropdowns
 * 5. Copy the Sheet ID from the URL and paste it into client-intake-automation.js
 */

function createCRM() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // ── Pipeline Tab ──
  let pipeline = ss.getSheetByName("Sheet1");
  if (pipeline) {
    pipeline.setName("Pipeline");
  } else {
    pipeline = ss.getSheetByName("Pipeline") || ss.insertSheet("Pipeline");
  }

  const pipelineHeaders = [
    "Date",
    "Name",
    "Email",
    "Company",
    "Message",
    "Stage",
    "Package Interest",
    "Value ($)",
    "Source",
    "Drive Folder",
    "Notes",
    "Next Follow-up",
  ];

  pipeline.getRange(1, 1, 1, pipelineHeaders.length).setValues([pipelineHeaders]);

  // Format header row
  const headerRange = pipeline.getRange(1, 1, 1, pipelineHeaders.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#0f172a");
  headerRange.setFontColor("#10b981");
  headerRange.setFontSize(10);

  // Set column widths
  pipeline.setColumnWidth(1, 110);  // Date
  pipeline.setColumnWidth(2, 150);  // Name
  pipeline.setColumnWidth(3, 200);  // Email
  pipeline.setColumnWidth(4, 150);  // Company
  pipeline.setColumnWidth(5, 300);  // Message
  pipeline.setColumnWidth(6, 130);  // Stage
  pipeline.setColumnWidth(7, 150);  // Package Interest
  pipeline.setColumnWidth(8, 100);  // Value
  pipeline.setColumnWidth(9, 120);  // Source
  pipeline.setColumnWidth(10, 200); // Drive Folder
  pipeline.setColumnWidth(11, 250); // Notes
  pipeline.setColumnWidth(12, 130); // Next Follow-up

  // Stage dropdown (Column F)
  const stageRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "New Lead",
      "Contacted",
      "Discovery Call Booked",
      "Discovery Call Done",
      "Proposal Sent",
      "Won — In Progress",
      "Won — Delivered",
      "Lost",
      "Nurturing",
    ])
    .build();
  pipeline.getRange("F2:F500").setDataValidation(stageRule);

  // Package Interest dropdown (Column G)
  const packageRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "Starter Setup ($749)",
      "Automation Sprint ($1,499)",
      "Pro Support ($799/mo)",
      "Consultation ($95/hr)",
      "Advanced Consultation ($125/hr)",
      "Undecided",
    ])
    .build();
  pipeline.getRange("G2:G500").setDataValidation(packageRule);

  // Source dropdown (Column I)
  const sourceRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "Intake Form",
      "Google Ads",
      "Reddit",
      "Blog / SEO",
      "Cold Email",
      "Referral",
      "Chatbot",
      "Other",
    ])
    .build();
  pipeline.getRange("I2:I500").setDataValidation(sourceRule);

  // Date format
  pipeline.getRange("A2:A500").setNumberFormat("yyyy-mm-dd");
  pipeline.getRange("L2:L500").setNumberFormat("yyyy-mm-dd");

  // Currency format
  pipeline.getRange("H2:H500").setNumberFormat("$#,##0");

  // Freeze header row
  pipeline.setFrozenRows(1);

  // ── Checklist Leads Tab (for nurture sequence) ──
  let checklist = ss.getSheetByName("Checklist Leads") || ss.insertSheet("Checklist Leads");

  const checklistHeaders = [
    "Date",
    "Name",
    "Email",
    "Source",
    "Converted to Pipeline?",
    "Emails Sent",
  ];

  checklist.getRange(1, 1, 1, checklistHeaders.length).setValues([checklistHeaders]);

  const clHeaderRange = checklist.getRange(1, 1, 1, checklistHeaders.length);
  clHeaderRange.setFontWeight("bold");
  clHeaderRange.setBackground("#0f172a");
  clHeaderRange.setFontColor("#10b981");
  clHeaderRange.setFontSize(10);

  checklist.setColumnWidth(1, 110);
  checklist.setColumnWidth(2, 150);
  checklist.setColumnWidth(3, 200);
  checklist.setColumnWidth(4, 180);
  checklist.setColumnWidth(5, 160);
  checklist.setColumnWidth(6, 100);

  checklist.setFrozenRows(1);

  // ── Dashboard Tab ──
  let dashboard = ss.getSheetByName("Dashboard") || ss.insertSheet("Dashboard");

  dashboard.getRange("A1").setValue("Steve's IT Pro — Pipeline Dashboard").setFontSize(14).setFontWeight("bold").setFontColor("#10b981");

  dashboard.getRange("A3").setValue("Total Leads").setFontWeight("bold");
  dashboard.getRange("B3").setFormula('=COUNTA(Pipeline!B2:B500)');

  dashboard.getRange("A4").setValue("New Leads (This Month)").setFontWeight("bold");
  dashboard.getRange("B4").setFormula('=COUNTIFS(Pipeline!A2:A500,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1),Pipeline!A2:A500,"<="&EOMONTH(TODAY(),0))');

  dashboard.getRange("A5").setValue("Discovery Calls Booked").setFontWeight("bold");
  dashboard.getRange("B5").setFormula('=COUNTIF(Pipeline!F2:F500,"Discovery Call Booked")');

  dashboard.getRange("A6").setValue("Proposals Sent").setFontWeight("bold");
  dashboard.getRange("B6").setFormula('=COUNTIF(Pipeline!F2:F500,"Proposal Sent")');

  dashboard.getRange("A7").setValue("Won (In Progress)").setFontWeight("bold");
  dashboard.getRange("B7").setFormula('=COUNTIF(Pipeline!F2:F500,"Won — In Progress")');

  dashboard.getRange("A8").setValue("Won (Delivered)").setFontWeight("bold");
  dashboard.getRange("B8").setFormula('=COUNTIF(Pipeline!F2:F500,"Won — Delivered")');

  dashboard.getRange("A9").setValue("Lost").setFontWeight("bold");
  dashboard.getRange("B9").setFormula('=COUNTIF(Pipeline!F2:F500,"Lost")');

  dashboard.getRange("A11").setValue("Pipeline Value").setFontWeight("bold").setFontSize(12);
  dashboard.getRange("B11").setFormula('=SUMIFS(Pipeline!H2:H500,Pipeline!F2:F500,"<>Lost",Pipeline!F2:F500,"<>Won — Delivered")').setNumberFormat("$#,##0");

  dashboard.getRange("A12").setValue("Revenue (Won)").setFontWeight("bold").setFontSize(12);
  dashboard.getRange("B12").setFormula('=SUMIFS(Pipeline!H2:H500,Pipeline!F2:F500,"Won — Delivered")+SUMIFS(Pipeline!H2:H500,Pipeline!F2:F500,"Won — In Progress")').setNumberFormat("$#,##0");

  dashboard.getRange("A14").setValue("Win Rate").setFontWeight("bold");
  dashboard.getRange("B14").setFormula('=IFERROR((COUNTIF(Pipeline!F2:F500,"Won*"))/(COUNTIF(Pipeline!F2:F500,"Won*")+COUNTIF(Pipeline!F2:F500,"Lost")),0)').setNumberFormat("0%");

  dashboard.getRange("A16").setValue("Leads by Source").setFontWeight("bold").setFontSize(12).setFontColor("#10b981");

  const sources = ["Intake Form", "Google Ads", "Reddit", "Blog / SEO", "Cold Email", "Referral", "Chatbot"];
  sources.forEach((source, i) => {
    dashboard.getRange(17 + i, 1).setValue(source);
    dashboard.getRange(17 + i, 2).setFormula(`=COUNTIF(Pipeline!I2:I500,"${source}")`);
  });

  dashboard.getRange("A25").setValue("Checklist Downloads").setFontWeight("bold");
  dashboard.getRange("B25").setFormula('=COUNTA(\'Checklist Leads\'!B2:B500)');

  dashboard.setColumnWidth(1, 220);
  dashboard.setColumnWidth(2, 120);

  // Move Dashboard to first position
  ss.setActiveSheet(dashboard);
  ss.moveActiveSheet(1);

  Logger.log("CRM setup complete! Tabs created: Dashboard, Pipeline, Checklist Leads");
}
