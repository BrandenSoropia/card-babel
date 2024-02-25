/**
 * Note: In `strings.json` there are generic messages
 * that will use these values as keys.
 *
 * Maybe consider using an object instead so we can be clearer
 * with this relationship... However Typescript seems to throw an error
 * if a key doesn't exist for every constant here. So maybe it works ok?
 */
enum NOTIFICATION_TYPES {
  ERROR = "ERROR",
}

export default NOTIFICATION_TYPES;
