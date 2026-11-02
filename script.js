// Paste your deployed Google Apps Script web-app URL below.
const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbxhtu0wotY8OhR4SO4ANhm00lDd2ajF_L0QwI8z5ZuCD2Kq6MoTlBvqrqBKKkg1RTrc/exec";

const form = document.getElementById("rsvp-form");
const button = document.getElementById("submit-button");
const statusText = document.getElementById("status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusText.textContent = "";

  if (RSVP_ENDPOINT.includes("PASTE_YOUR_")) {
    statusText.textContent = "The RSVP page is not connected yet. Please contact the hosts.";
    return;
  }

  const data = new FormData(form);
  const payload = {
    name: String(data.get("name") || "").trim(),
    response: String(data.get("response") || ""),
    website: String(data.get("website") || "")
  };

  if (!payload.name || !["YES", "NO"].includes(payload.response)) {
    statusText.textContent = "Please enter your name and select YES or NO.";
    return;
  }

  button.disabled = true;
  button.textContent = "SENDING…";

  try {
    // no-cors is used because Apps Script does not provide browser CORS headers.
    // The browser cannot read the response, so a network-level failure may not be detectable.
    await fetch(RSVP_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    form.innerHTML = `
      <div class="success">
        <h2 style="color:#7d252d;text-align:center">Thank you!</h2>
        <p style="text-align:center;line-height:1.6">
          Your RSVP has been submitted. We appreciate you letting us know.
        </p>
      </div>`;
  } catch (error) {
    statusText.textContent = "Something went wrong. Please try again or contact the hosts.";
    button.disabled = false;
    button.textContent = "SEND RSVP";
  }
});
