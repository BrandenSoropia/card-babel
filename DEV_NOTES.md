# Dev Notes

Here I'll log a list of TODOs, progress, discoveries, bugs/issues I ran into. I want to keep notes on how things go since I've been bashing my head a lot just trying to get things setup haha.

<details>
<summary>Note to self</summary>

It's been ~5months since I coded, plus it's my first time setting up Next and Firestore. Be gentle and learn slowly! (Try to not pull your hair out too!)

<details>

**In chronological order**

## 📜 History

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
