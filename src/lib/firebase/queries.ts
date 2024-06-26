import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { FABCard } from "./documents.types";

import UZURI_CARD_LIST from "./sample_uzuri_blitz_deck_translations.json";

const fabCardsCollection = collection(db, "games/fleshAndBlood/cards");

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

export const getAllFabCardData = async () => {
  try {
    const querySnap = await getDocs(fabCardsCollection);

    if (!querySnap.empty) {
      const results = querySnap.docs.map((docSnap) => {
        return docSnap.data() as unknown as FABCard;
      });

      return results;
    }

    // TODO: Probably should notify there's something wrong to user
    console.log("No documents!");
    return [];
  } catch (error) {
    console.log("### getAllFabCardData errored:", error);
  }
};

/**
 * Card Numbers always are 6 characters long starting with 3 letters
 * and ending with 3 numbers.
 *
 * The cards have the letters in uppercase, so trying to search a
 * database, the input should be transformed to caps.
 *
 * Quick examples of regex in action: https://regex101.com/r/sFsAu9/1
 */
const CARD_NUMBER_LENGTH = 6;
const CARD_NUMBER_FORMAT = /^\w{3}\d{3}$/;

export const isSearchTextValidFABCardNumber = (searchText: string) => {
  return (
    searchText.length === CARD_NUMBER_LENGTH &&
    searchText.match(CARD_NUMBER_FORMAT)
  );
};

export const getCardSearchResults = async (
  searchText: string
): Promise<FABCard[]> => {
  if (!isSearchTextValidFABCardNumber(searchText)) {
    throw Error(
      'Text is invalid. Card Number should be 6 characters total with starting with 3 letters then 3 numbers. \n For example: "DYN122".'
    );
  }
  const formattedSearchText = searchText.toUpperCase();

  const querySnap = await getDocs(
    query(
      fabCardsCollection,
      where("cardNumber", "array-contains", formattedSearchText)
    )
  );

  if (!querySnap.empty) {
    return querySnap.docs.map((docSnap) => {
      return docSnap.data() as unknown as FABCard;
    });
  }

  return [];
};
