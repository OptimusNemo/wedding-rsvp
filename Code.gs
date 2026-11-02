// Google Apps Script backend for the wedding RSVP page.
// Notification recipient:
const NOTIFICATION_EMAIL = "Punamwork98@gmail.com";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");

    // Basic spam and input validation.
    if (payload.website) return jsonResponse({ ok: true });
    const name = String(payload.name || "").trim().slice(0, 100);
    const response = String(payload.response || "").toUpperCase();

    if (!name || !["YES", "NO"].includes(response)) {
      throw new Error("Invalid RSVP submission");
    }

    const timestamp = new Date();
    const subject = "Wedding RSVP: " + response + " — " + name;
    const body =
      "A new wedding RSVP has been received.\n\n" +
      "Guest name: " + name + "\n" +
      "Response: " + response + "\n" +
      "Submitted: " + timestamp.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) +
      " (India time)\n";

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      body: body,
      name: "Wedding RSVP"
    });

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonResponse({ service: "Wedding RSVP endpoint", status: "ready" });
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
