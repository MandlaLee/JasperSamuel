const SPREADSHEET_ID = '1T6QVrL-l9An3sYe0Djdmpr1msjAuKYj4OllTBMxSq_Y';
const WAITING_LIST_SHEET = 'Waiting List';
const CONTACT_MESSAGES_SHEET = 'Contact Messages';

function doGet() {
  return jsonResponse({ ok: true, service: 'Jasper Samuel website forms' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const data = e && e.parameter ? e.parameter : {};

    // Honeypot field. Bots usually fill hidden fields; real visitors do not.
    if (clean(data.website)) {
      return jsonResponse({ ok: true });
    }

    const firstName = safeCell(data.firstName);
    const lastName = safeCell(data.lastName);
    const email = clean(data.email).toLowerCase();
    const phone = safeCell(data.phone);
    const subject = safeCell(data.subject || 'General Question');
    const book = safeCell(data.book);
    const message = safeCell(data.message);
    const sourcePage = safeCell(data.sourcePage || 'pastor.kingshipcentre.co.za');
    const consent = clean(data.consent).toLowerCase();

    if (!firstName || !email || !isValidEmail(email)) {
      return jsonResponse({ ok: false, error: 'Please provide a valid first name and email address.' });
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const isWaitingList = subject === 'Book Waiting List' || Boolean(book);

    if (isWaitingList) {
      if (!book) {
        return jsonResponse({ ok: false, error: 'No book was selected.' });
      }

      if (consent !== 'yes') {
        return jsonResponse({ ok: false, error: 'Consent is required to join the waiting list.' });
      }

      const sheet = spreadsheet.getSheetByName(WAITING_LIST_SHEET);
      if (!sheet) throw new Error(`Missing sheet: ${WAITING_LIST_SHEET}`);

      if (!alreadyWaiting(sheet, email, book)) {
        sheet.appendRow([
          new Date(),
          firstName,
          lastName,
          safeCell(email),
          phone,
          book,
          'New',
          sourcePage,
          'Yes',
          message
        ]);
      }

      return jsonResponse({ ok: true, type: 'waiting-list' });
    }

    const sheet = spreadsheet.getSheetByName(CONTACT_MESSAGES_SHEET);
    if (!sheet) throw new Error(`Missing sheet: ${CONTACT_MESSAGES_SHEET}`);

    sheet.appendRow([
      new Date(),
      firstName,
      lastName,
      safeCell(email),
      phone,
      subject,
      message,
      'New',
      sourcePage
    ]);

    return jsonResponse({ ok: true, type: 'contact' });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: 'The form could not be saved. Please try again.' });
  } finally {
    try {
      lock.releaseLock();
    } catch (_) {}
  }
}

function alreadyWaiting(sheet, email, book) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  const startRow = Math.max(2, lastRow - 499);
  const rowCount = lastRow - startRow + 1;
  const rows = sheet.getRange(startRow, 4, rowCount, 3).getDisplayValues();

  return rows.some(row => {
    const existingEmail = clean(row[0]).toLowerCase();
    const existingBook = clean(row[2]).toLowerCase();
    return existingEmail === email && existingBook === clean(book).toLowerCase();
  });
}

function clean(value) {
  return String(value || '').trim().slice(0, 5000);
}

// Prevent spreadsheet formula injection from public form fields.
function safeCell(value) {
  const text = clean(value);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
