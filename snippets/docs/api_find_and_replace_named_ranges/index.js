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
 * Run the snippet
 */
function run() {
  const docId = DocumentApp.getActiveDocument().getId();
  const response = replaceAllText(
    [
      {
        substitution: '{{print}}',
        text: 'Print!',
      },
    ],
    docId
  );
  console.log(response);
}

/**
 * Execute all Replacements
 *
 * @param {Array.<Replacement>} replacements
 * @param {string} docId
 * @return {GoogleAppsScript.Docs.Schema.BatchUpdateDocumentResponse}
 */
function replaceAllText(replacements, docId) {
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

  const batchUpdateDocumentResponse = Docs.Documents.batchUpdate(batchUpdateDocumentRequest, docId);

  return batchUpdateDocumentResponse;
}
