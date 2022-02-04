/**
 * @typedef {{
     substitution: string,
     text: string
   }} Replacement
 */

/**
 * @file
 * @url
 */

/**
 * Run the snippet for the active document
 */
function run() {
  const response = replaceAllText([
    {
      substitution: '{{datetime}}',
      text: Utilities.formatDate(new Date(), 'GMT+3', 'dd.mm.yyyy HH:MM'),
    },
    {
      substitution: '{{signature}}',
      text: 'Alex Ivanov',
    },
  ]);
  console.log(response);
}

/**
 * Execute all Replacements
 *
 * @param {Array.<Replacement>} replacements
 * @param {string} id The Doc id
 * @return {GoogleAppsScript.Docs.Schema.BatchUpdateDocumentResponse}
 */
function replaceAllText(replacements, id = DocumentApp.getActiveDocument().getId()) {
  const requests = replacements.map((replacement) => {
    const substringMatchCriteria = Docs.newSubstringMatchCriteria();
    substringMatchCriteria.matchCase = false;
    substringMatchCriteria.text = replacement.substitution;

    const replaceAllTextRequest = Docs.newReplaceAllTextRequest();
    replaceAllTextRequest.containsText = substringMatchCriteria;
    replaceAllTextRequest.replaceText = replacement.text;

    const request = Docs.newRequest();
    request.replaceAllText = replaceAllTextRequest;

    return request;
  });

  const batchUpdateDocumentRequest = Docs.newBatchUpdateDocumentRequest();
  batchUpdateDocumentRequest.requests = requests;

  const batchUpdateDocumentResponse = Docs.Documents.batchUpdate(batchUpdateDocumentRequest, id);

  return batchUpdateDocumentResponse;
}
