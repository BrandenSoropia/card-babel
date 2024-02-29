# Dev Notes

Here I'll log a list of TODOs, progress, discoveries, bugs/issues I ran into. I want to keep notes on how things go since I've been bashing my head a lot just trying to get things setup haha.

<details>
<summary>Note to self</summary>

It's been ~5months since I coded, plus it's my first time setting up Next and Firestore. Be gentle and learn slowly! (Try to not pull your hair out too!)

</details>

**In chronological order**

Key take aways

- Why I decided to have unique documents per card and per colour (if applicable)
  - [Ramblings-on-Document-Shape](#Ramblings-on-Document-Shape)
  - [Conclusion-on-Document-Shape](#Conclusion-on-Document-Shape)

## 📜 History

### February 26, 2024

- ✅ Installed `theme-ui` and `emotion` for design system architecting
  - Also found out the old library I used to use for theming, `styled-system`, is no longer supported! This took a while to figure out, I am embarrassed haha. Amazingly, `theme-ui` is much more convenient since it comes with common components like `Flex` and `Button` so I don't have to manually rebuild the primitive components each time!
  - Also trying to do some a11y font work for the first time: using `rems` instead of `px`. It's a little weird looking but makes sense. [Read about them here](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/)
    - Also because of using `theme-ui`, I learned a little about how JSX is transpiled to js. You can "extend" the JSX transpiler to recognize custom props, and that's how `theme-ui` transpiles the `sx` prop into styles using your theme values. [Explanation here](https://theme-ui.com/guides/jsx-pragma)

### February 25, 2024

- ✅ Figure out how to stop re-rendering if Notification context is updated
  - [Read simple explanation, then there's a detailed example linked](https://stackoverflow.com/a/65639153)
  - Solution: `e.preventDefault()` needed in the `<button onClick={...} />`! After all these years, I never really checked exactly what "default" was prevented: for buttons in forms, the default action is to submit form and refresh the page! [Source](https://bobbyhadz.com/blog/react-prevent-page-refresh-on-form-submit).
- ✅ Add error seraching for card state

### February 24, 2024

- ✅ Create toast system using context to handle and display error messages from anywhere. This is a good way to practice using React context.
  - Used `enum` for notification message type and previously just thought it was a simpler way of creating constants with extra features. Today I learned they have a some nifty usage in Typescript: I can use them to constrict types unlike if I used regular variables (like `const ERROR = "ERROR"` etc.). Read it here - https://www.typescriptlang.org/docs/handbook/enums.html#string-enums
- Extra learnings:
  - [How to visually hide button text but leave it available for screen readers.](https://gomakethings.com/hidden-content-for-better-a11y/#hiding-the-link)

### February 19, 2024

- ✅ Added states for search result screen: initial state, loading and no matches found.
  - I initially had loading, no matches and found matches all in one component. It is small enough now in this barebones version, but I didn't like how messy the render logic looked mixed with JSX. Thus a pulled each state into a tiny component. I think it's a little cleaner and also easier to style/customize this way!
- Extra! Found out about [Next's project organization convention](https://nextjs.org/docs/app/building-your-application/routing/colocation#project-organization-features): one can create private folders that are not treated as routes by prefixing a folder name with an underscore (`_`). For my use, I want to have separate UI folders, thus, the card search code has been moved into `_card-search`.
- I realized I haven't really written much error handling! Before this update, I had a try/catch wrapping the `getCardSearchResults` Firebase query that actually silenced all errors and didn't really have a way to notify UI with something helpful to show the user. (I think it would be fine to rethrow any errors found, if I wanted to process/log the error before.) Now I'll move the try/catch to the function calling the API call instead, that way the UI can hopefully notice the error and show something useful to the user. All of this comes from a useful StackOverflow - https://stackoverflow.com/a/42171508.
- Also realized how out of practice I am with React essentials like hooks. I really am glad to be working on this a bit more.

### February 13, 2024

- ✅ Frontend: query by card ID~~/localized name~~
  - Unfortunately I found out that there isn't a way to query a document's field containing a substring... So that basically kills the plan to search by card name unless the user types the whole thing correctly. [StackOverflow for some interesting "hacks" and alternatives](https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search)
  - Basically this forces me to use card numbers only to get an MVP out. Otherwise I can use something like Elastic Search, but that that would take too much time and effort for a small project. It would be interesting to learn about though so I'll do some reading at least later!
- ✅- Frontend: Show said data
  - Made a super rough input, search and search result UI.
  - Also added `markdown-to-jsx` to support styling/allow more flexibility rendering card details. I used this library before so I thought to use it again. Also it mentioned it's "lightweight", and without really checking other libraries other than `react-markdown`, it seems to be the only one claiming this? Lastly, `markdown-to-jsx` has more stars, so it probably is more battle tested!

### February 11, 2024

- ✅ Upload small subset of FaB Card data for testing. Uploaded cards for the Uzuri list I use since I play that and often run into translations needs.

### February 5, 2024

- ✅ Made sample card data json with formatted card text that should be parsable using Markdown.

#### Conclusion on Document Shape

**Part 2: Thoughts on How to Deal with Multiple Printings of the Same Card**

I decided to have unique documents per card colour. This is because each colour has the same effect, but slightly weaker/stronger stat or effect depending on which colour it is. Also in the case that the there's a miss-print in a certain card colour, a change can be made directly.

["Ravenous Rable" red](https://fabrary.net/cards/ravenous-rabble-red) vs [its yellow version](https://fabrary.net/cards/ravenous-rabble-yellow). It has the same effect, just that the red version has 1 more power than the yellow version.

**Part 2: Thoughts on Using Card Number for Document Ids**

I decided not to use card numbers as document ids. A card can be reprinted in different sets with the exact same name, colour, effect etc but since it's in a different set, I'd have duplicate copies of the same card in the database.

Let's take a look again at ["Ravenous Rable" (red) is a good example.](https://fabrary.net/cards/ravenous-rabble-red) As of February 5, it has 5 reprintings. The cards are exactly the same, so it makes no sense to have unique docs.

### February 3, 2024

- ✅ Better structure for data:
  - ✅ How to store Flesh and Blood (and Digimon)?
  - ✅ How should translations and cards look?

#### Designing the Firestore "schema" (or basically how I'll be organizing and storing the data)

I'd like to DB to be able to do 3 things:

1. Store all cards and their translations
2. Be easily searchable (more than likely players will be searching for specific cards)
3. More a future thing, but support multiple card game data

#### Learning How to Get Data from Firebase

First off, there's lots of different platforms for Firebase and they each have their own docs. There's a few for JS, but the one for client side (via npm) is this one - https://firebase.google.com/docs/reference/js/firestore_.md#functions. (I feel super bad it took me a while to find this specific one haha).

Next I learned how to get data from Firestore: you have to query them! I remember from my past work at Figure1, we used an older API that looked something like `myFirebaseApp.collection(...).getDoc(somePath).where(...)`. It seems that changed and we have something similar: `query(collection, constraint1, constraint2, ...)`. Read more about that here - https://firebase.google.com/docs/firestore/query-data/queries.

#### Ramblings on Document Shape

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

- Frontend: Make super simple design
  - Taking inspiration from this design: https://dribbble.com/shots/23630207-Women-s-fashion-app
  - Make box, input, button, text
  - Replace usages within app
  - define colour system for light theme

## TODOs

- Setup styled system for consistency and practice making another design system
- Setup basic unit tests for search card query
- Write a Cypress test for searching card that succeeds and fails
- 🐛 Bugs to Fix:
  - Try to fix `strong` breaking when they are at the start of the string(?). See `DYN122` as example card.
- Clean up code !!!
- Deploy to "staging" (if possible) and test if can actually connect not from localhost

## Nice to haves/If I have the extra time and energy to learn

- Learn how to scrape Library of FaB for JP translations
- Upload data for HVY, OUT
