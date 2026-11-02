# Wedding RSVP — Punam weds Subhojit

A small, mobile-friendly RSVP page using plain HTML, CSS and JavaScript, with Google Apps Script sending email notifications.

## Features
- Guest name and YES / NO response
- Email notification to `Punamwork98@gmail.com`
- Responsive, lightweight frontend
- No paid APIs or paid hosting required
- MIT-licensed project source

## 1. Create the email backend
1. Sign in to the Google account that should send the notifications.
2. Visit https://script.google.com and create a new project.
3. Replace the starter code with the contents of `Code.gs`.
4. Save the project.
5. Select **Deploy → New deployment**.
6. Select the gear icon and choose **Web app**.
7. Set **Execute as** to **Me**.
8. Set **Who has access** to **Anyone**.
9. Deploy, authorize the requested permissions, and copy the Web app URL ending in `/exec`.

The script sends notifications to `Punamwork98@gmail.com`. Google may display an authorization warning during first-time setup; review the requested permissions before approving.

## 2. Connect the frontend
Open `script.js` and replace:

`PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`

with the deployed `/exec` URL. Save the file.

## 3. Publish free with GitHub Pages
1. Create a public GitHub repository, for example `wedding-rsvp`.
2. Upload `index.html`, `style.css`, and `script.js` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site. Copy the published HTTPS URL.

`Code.gs` can remain in the repository as the backend source. Do not put passwords, private keys, or other secrets in the repository.

## 4. Create the QR code
Generate a QR code that points to the published GitHub Pages URL. Test it on a phone before printing.

## Important notes
- The frontend uses `fetch` with `mode: "no-cors"` because Apps Script web apps do not provide the CORS response headers needed for a normal browser request. The page therefore cannot verify the server's response; it shows the thank-you message after the request is handed off by the browser. Test the complete flow, including receipt of the email, before sharing.
- Apps Script and Gmail have usage quotas and policies that Google can change. This is intended for a small wedding RSVP, not high-volume public use.
- The page does not collect email addresses or require guests to sign in.
- This basic version does not provide strong duplicate prevention or tamper-proof spam protection. A guest can submit more than once.
- Anyone with the web-app URL can submit an RSVP. Keep the URL available only through the published page/QR if that is your preference.

## License
MIT. See `LICENSE`.
