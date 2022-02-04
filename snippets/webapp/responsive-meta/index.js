/* exported doGet */
/**
 * Using responsive meta tags for the webapp
 */
function doGet() {
  const htmlContent = 'Hello world!';
  return HtmlService.createHtmlOutput(htmlContent).addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
