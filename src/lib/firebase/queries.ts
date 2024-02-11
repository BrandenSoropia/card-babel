import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

import UZURI_CARD_LIST from "./sample_uzuri_blitz_deck_translations.json";

const fabCardsCollection = collection(db, "games/fleshAndBlood/cards");

export const getAllFabCardData = async () => {
  try {
    const querySnap = await getDocs(fabCardsCollection);

    if (!querySnap.empty) {
      console.log("### Printing docs");
      querySnap.forEach((doc) => {
        console.log("### doc", doc.data());
      });
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No documents!");
    }
  } catch (error) {
    console.log("### getAllFabCardData errored:", error);
  }
};

/**
 * Just a hardcoded way for me to quickly upload card data to Firebase!
 *
 * I wanted to make it fancy by making some simple form that allows
 * only authenticated users (using Firebase Auth) to write... But that
 * quickly got me too side tracked and I just want a MVP, so I went with this.
 *
 * Note: I have to update Firestore rules to allow an writes to the collection.
 * Then when done, I turn it off ^^;
 */
export const writeUzuriSampleCards = async () => {
  try {
    UZURI_CARD_LIST.cards.forEach(async (card) => {
      console.log("### Writing:", card.name);
      await addDoc(fabCardsCollection, card);

      console.log("### Done!");
    });
  } catch (e) {
    console.log("### Error adding cards", e);
  }
};
