/**
 * These types should match the document shape in Firestore!
 */

interface Card {
  name: string;
  cardNumber: string[];
}

export interface FABCard extends Card {
  translationInfo: {
    sourceText: string;
    translationSource: string;
  };
  details: {
    "en-US": string;
    /**
     * "jp-JA" is required for now since this little project's goal is only to support English to Japanese!
     * If other languages needed, would have to make this optional (or at least think some more about shape!)
     */
    "jp-JA": string;
  };
}
