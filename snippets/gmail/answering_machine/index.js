/**
 * @file Forward without attachments
 * @url https://groups.google.com/forum/#!topic/google-apps-script-community/T5Da0B35uI4
 */

/**
 *
 */
function run() {
  forwardWithoutAttachments_('subject:Indian language support');
}

/**
 * Forward without attachments
 * @param {string} query
 * @return {GoogleAppsScript.GmailApp.GmailMessage}
 */
function forwardWithoutAttachments_(query) {
  /**
   * @type {GoogleAppsScript.Gmail.GmailMessage}
   */
  const message = GmailApp.search(query)
    .reduce((p, c) => {
      p = p.concat(c.getMessages());
      console.log(c.getFirstMessageSubject());
      return p;
    }, [])
    .find((msg) => msg.getAttachments().length);
  return message.forward('alexanderivanovdev@gmail.com', { attachments: [] });
}
