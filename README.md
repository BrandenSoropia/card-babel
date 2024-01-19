# card-babel

Look up translations for popular card games like Flesh and Blood and Digimon!

Using React (via Next.js), Typescript and Firebase!

## Running the App Locally

<details>
<summary>❗ Disclaimer: Developed on Windows which might cause problems if used on different systems.</summary>

Ages ago I remember there being issues when cloning repo and running on Unix-based systems. Not sure if anything will happen so watch out! (Will update here if there are any gotcha's).

Might be related stuff is getting converted from LF to CRLF? (Will look into this later)

```bash
warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of '.eslintrc.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'next.config.mjs', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/app/globals.css', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/app/layout.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/app/page.module.css', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/app/page.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'tsconfig.json', LF will be replaced by CRLF the next time Git touches it
```

</details>
<br>

- Node - Using `v20.10.0`. ["nvm" used to manage versions.](https://github.com/nvm-sh/nvm#install--update-script). Currently on node .
- Yarn - Using `v.1.22.21` - [Install instructions found here.](https://yarnpkg.com/getting-started/install)

1. Navigate to your local copy of this repo, then install dependencies by running `yarn` in your terminal.
2. Run the app: `yarn dev`, it should be hosted on `localhost:3000`.

- To future Branden, if Next is acting funny, it might be because I installed `v.14` first, then cleared it and installed `v13.4.7` following these [instructions](https://github.com/vercel/next.js/discussions/35794#discussioncomment-4762089). So far it seems fine though!

### (🏗️ TODO) Connecting to Firestore

This app uses Firestore for API and database services!

## Deployment using Firebase

> Uses Next `v13.4.7` since Firebase deploy only supports that version!

Firebase is used to deploy and host. Requires the `firebase-cli` to run these commands. Followed these Firebase doc for help: https://firebase.google.com/docs/hosting/frameworks/nextjs.

### Setup

1. Install `firebase-cli` globally following the instructions [here](https://firebase.google.com/docs/cli?authuser=0&hl=en#windows-standalone-binary).
2. Open up terminal. Login using Google credentials: `firebase login`.
3. Confirm login using `firebase projects:list`. A list of projects should show up.

<details>
<summary>If login fails on Windows + Git Bash shell</summary>

If you're on Windows and using Git Bash as your shell, you might see the following error when trying `firestore login`

```
$ firebase login

Error: Cannot run login in non-interactive mode. See login:ci to generate a token for use in non-interactive environments.
```

Just run the command with the interactive flag: `firestore login --interactive`. [(source)](https://github.com/firebase/firebase-tools/issues/149)

</details>
