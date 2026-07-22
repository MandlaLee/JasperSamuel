# Jasper Samuel website form receiver

The website uses a Google Apps Script web app to save form submissions into the **Jasper Samuel Website Submissions** spreadsheet.

## Deploy

1. Open the spreadsheet in Google Sheets.
2. Select **Extensions → Apps Script**.
3. Replace the editor contents with `Code.gs` from this folder and save.
4. Select **Deploy → New deployment**.
5. Choose **Web app**.
6. Set **Execute as** to **Me**.
7. Set **Who has access** to **Anyone**.
8. Deploy, approve the requested Google permissions, and copy the `/exec` web-app URL.
9. Add that URL to `FORM_ENDPOINT` in `js/script.js`.

Do not use the `/dev` test URL on the live website. Redeploy a new version after changing the Apps Script code.
