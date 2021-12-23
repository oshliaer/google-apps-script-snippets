/**
 * On Homepage event trigger
 *
 * @param {GoogleAppsScript.Addons.EventObject} e Event Object
 * @returns {GoogleAppsScript.Card_Service.Card}
 */
function onHomepage(e) {
  return createTextCard();
}

/**
 * On Drive item selected event trigger
 *
 * @param {GoogleAppsScript.Addons.EventObject} e Event Object
 * @returns {GoogleAppsScript.Card_Service.Card}
 */
function onDriveItemsSelected(e) {
  const items = e.drive.selectedItems;
  const text = items.map((driveItem) => driveItem.title).join('\n');
  return createTextCard(text);
}

/**
 * Create Card
 *
 * @param {string} text Text
 * @param {boolean} isHomepage
 * @returns {GoogleAppsScript.Card_Service.Card}
 */
function createTextCard(text, isHomepage) {
  const message = isHomepage ? `HOMEPAGE\n${text}` : `${text}`;
  const textWidget = CardService.newTextParagraph().setText(message);
  const section = CardService.newCardSection().addWidget(textWidget);
  const card = CardService.newCardBuilder().addSection(section);
  return card.build();
}
