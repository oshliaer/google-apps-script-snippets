/**
 * @file Return cantacts birthdays
 */

/**
 *
 */
function run() {
  console.log(ContactsApp.getContactsByDate(ContactsApp.Month.MAY, 8, ContactsApp.Field.BIRTHDAY));
}
