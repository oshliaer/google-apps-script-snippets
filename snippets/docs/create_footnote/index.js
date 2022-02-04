/**
 *
 */

/**
 * Runs the sample.
 * Insert a footnote to specific position
 */
function run() {
  const reply = createFootnoteWithText_('Aha!', 1);
  console.log(JSON.stringify(reply, null, ' '));
}

/**
 * Create a footnote with the text
 *
 * @param {string} text
 * @param {number} bodyIndex
 * @param {string} id
 * @returns Result of batch updates or an issue reply
 */
function createFootnoteWithText_(text, bodyIndex, id = DocumentApp.getActiveDocument().getId()) {
  const createFootnoteReplies = createFootnote_(bodyIndex, id);
  if (createFootnoteReplies && createFootnoteReplies.replies.length) {
    const reply = createFootnoteReplies.replies[0];
    return appendTextTo_(text, reply.createFootnote.footnoteId, id);
  }
  return { issue: 'no replies', createFootnoteReplies };
}

/**
 * Insert an empty footnote to body index
 * @param {number} bodyIndex
 */
function createFootnote_(bodyIndex, id = DocumentApp.getActiveDocument().getId()) {
  return Docs.Documents.batchUpdate(
    {
      requests: {
        createFootnote: {
          location: {
            index: bodyIndex,
          },
        },
      },
    },
    id
  );
}

/**
 * Append a text to the segment
 * @param {string} text
 * @param {string} segmentId
 */
function appendTextTo_(text, segmentId = undefined, id = DocumentApp.getActiveDocument().getId()) {
  return Docs.Documents.batchUpdate(
    {
      requests: {
        insertText: {
          text,
          endOfSegmentLocation: {
            segmentId,
          },
        },
      },
    },
    id
  );
}
