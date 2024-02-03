# Dev Notes

Here I'll log a list of TODOs, progress, discoveries, bugs/issues I ran into. I want to keep notes on how things go since I've been bashing my head a lot just trying to get things setup haha.

<details>
<summary>Note to self</summary>

It's been ~5months since I coded, plus it's my first time setting up Next and Firestore. Be gentle and learn slowly! (Try to not pull your hair out too!)

<details>

**In chronological order**

## 📜 History

### February 3, 2024

#### Designing the Firestore "schema" (or basically how I'll be organizing and storing the data)

I'd like to DB to be able to do 3 things:

1. Store all cards and their translations
2. Be easily searchable (more than likely players will be searching for specific cards)
3. More a future thing, but support multiple card game data

#### Learning How to Get Data from Firebase

First off, there's lots of different platforms for Firebase and they each have their own docs. There's a few for JS, but the one for client side (via npm) is this one - https://firebase.google.com/docs/reference/js/firestore_.md#functions. (I feel super bad it took me a while to find this specific one haha).

Next I learned how to get data from Firestore: you have to query them! I remember from my past work at Figure1, we used an older API that looked something like `myFirebaseApp.collection(...).getDoc(somePath).where(...)`. It seems that changed and we have something similar: `query(collection, constraint1, constraint2, ...)`. Read more about that here - https://firebase.google.com/docs/firestore/query-data/queries.

#### Ramblings on "Schema" (Document Shape).

**Storing only Effect Text**
I think a card's attribute, name, cost and etc. are the absolute basic knowledge a player needs to be able to know how to play/use cards. Thus I'm ignoring storing/translating all that and just caring about the card effect(s)/special requirement(s).

**Thoughts on Using Card Number for Document Ids**
I'd like searching a specific card to be as easy as possible too, so regardless of what language a player speaks, they should be able to search by a card's number. Because of this I'll be using the card number as document ids since they are unique[In Firebase's docs, it mentions not to do this but I think my use case doesn't trigger "hotspotting" as I'm only reading from Firebase.](https://firebase.google.com/docs/firestore/best-practices#document_ids).

> I just confirmed that cards with different pitch value (blue, yellow, red), all have unique codes! [See "Shred" for example](https://fabrary.net/cards/shred-red)

**Thoughts on How to Deal with Multiple Printings of the Same Card**
There are reprints of cards in different sets, [for example "Ravenous Rabble"](https://fabrary.net/cards/ravenous-rabble-red) that have the same effect but different card numbers.

TBD on how to handle this!

### Jan 20, 2024

- ✅ Create app in Firebase and add web app
- ✅ - Add test data to firebase

### Jan 30, 2024

- ✅ Connect app to firebase https://firebase.google.com/docs/web/setup?hl=en&authuser=1
  - 🐛 Bug: Firebase config wasn't being read as I assumed Next would just read and populate the m from process.env. Next does read them, however it only exposes them to the server, not the client where I need to pass them so it can connect to Firebase!
  - ❓ Question: Is it safe to expose Firebase config? Yes, it's how they make it work. Preventing malicious connections is mitigated by Firestore rules. https://stackoverflow.com/a/37484053
    - Answer: Use prefix client required env's with "NEXT*PUBLIC*". https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser
- Make test query to create and add just to prove it works
  ○ Bug: Attempted call to create a test collection. It failed.
  § Reason: I set my Firestore to "LOCKED" when I initialized the project, and by default, that prevents all read and writes. https://firebase.google.com/docs/rules/basics#default_rules_locked_mode
  - Solution: Update Firestore rules to allow reads by general public.
- ✅ Set Firestore rules to publicly read only. Do not allow anything else. Steal code from: https://firebase.google.com/docs/rules/basics#mixed_public_and_private_access
- ✅ Tested getDocs works locally! 😭🥳

## In Progress

- Better structure for data:
  - How to store Flesh and Blood (and Digimon)?
  - How should translations and cards look?

## TODOs

- Once decided, upload small subset of FaB Card data for testing
- Frontend: query by card ID/localized name
- Frontend: Show said data
- Learn how to scrape Library of FaB for JP translations
- Upload data for HVY, OUT
- Frontend: Make super simple design
- Deploy to "staging" (if possible) and test if can actually connect not from localhost