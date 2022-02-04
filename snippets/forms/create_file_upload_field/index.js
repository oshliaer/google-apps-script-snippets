/**
 * Copies a template and builds a new Form
 */
function run() {
  const form = FormApp.openById('1YK5KU2mTgSK6HUtp3foRaT9X4M2mElVAlpCN8uk2unQ');
  const fileUploadItems = getFileUploadItems_(form);
  if (!fileUploadItems.length) {
    console.info("The Form doesn't have a FILE_UPLOAD item");
    return;
  }

  // Create a copy of the Form and fill it with other items

  // Copy
  const newForm = FormApp.openById(DriveApp.getFileById(form.getId()).makeCopy().getId());

  // Delete all items except one
  newForm.getItems().forEach((item) => {
    if (!fileUploadItems.some((entry) => entry.index === item.getIndex())) newForm.deleteItem(item);
  });

  // Add a TEXT item
  const textItem = newForm.addTextItem().setTitle('New TEXT item');
  newForm.moveItem(textItem.getIndex(), 0); // Move it to first
}

/**
 *
 * @param {GoogleAppsScript.Forms.Form} form
 */
function getFileUploadItems_(form) {
  return form
    .getItems()
    .map((item) => {
      return {
        item: item,
        type: item.getType().toString(),
        ordinal: item.getType().ordinal(),
        index: item.getIndex(),
        id: item.getId(),
      };
    })
    .filter((item) => item.type === 'FILE_UPLOAD');
}
