# card-babel

Look up translations for popular card games like Flesh and Blood!

Using React (via Next.js), Typescript and Firebase!


📽️ In Action:
<video width="630" height="300" src="https://github.com/user-attachments/assets/6ecc82d5-21f8-4b0e-8904-d3f56aff925f"></video>


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
2. Create a `.env.local` file in the root folder with the following variables. Then fill the appropriate variables with the config values found in Firestore > Project Settings > General > Scroll down to "Your Apps" and find it in "Web App" - https://console.firebase.google.com/u/1/project/card-babel-ba0f2/settings/general

```bash
NEXT_PUBLIC_API_KEY=""
NEXT_PUBLIC_AUTH_DOMAIN=""
NEXT_PUBLIC_PROJECT_ID=""
NEXT_PUBLIC_STORAGE_BUCKET=""
NEXT_PUBLIC_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_APP_ID=""
NEXT_PUBLIC_MEASUREMENT_ID=""
```

3. Run the app: `yarn dev`, it should be hosted on `localhost:3000`.

<details>
<summary>IF Next.js is acting weird</summary>
To future Branden, if Next is acting funny, it might be because I installed `v.14` first, then cleared it and installed `v13.4.7` following these [instructions](https://github.com/vercel/next.js/discussions/35794#discussioncomment-4762089). So far it seems fine though!

</details>

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

### Firebase Rules

Use `firestore.rules` since we can keep a history of edits and have 1 source of truth.

Once you've done making edits, you can deploy just the rules to Firebase by running the command:

```bash
firebase deploy --only firestore:rules
```

## If Developping on a Windows Machine: Follow This Suggested Setup to Use WSL

> Only if you're using Windows and mainly writting this because I might forget the steps myself!

<details>
<summary>Why I use WSL</summary>

I needed an interactive bash terminal. Interactive as in when running things like `create-next-app` or `firebase-cli`, pressing the arrow keys and typing in answers to CLI prompts actually did something. I tried using `git-bash` that comes installed when you install `git` on Windows, but quickly found out it doesn't support that and is generally annoying to use.

</details>

Install WSL following their docs - https://learn.microsoft.com/en-us/windows/wsl/install

- You'll have to install `git`, `node` and `firebase-cli` in the WSL partition since WSL is separate from your Windows partition. Basically just install all those in the WSL terminal, following the Unix instructions of those tools.

## Thanks

I used some free stuff to build this, so I wanted to mention them here:

- Design inspired by: https://dribbble.com/shots/23630207-Women-s-fashion-app
- Icons: https://iconduck.com/icons/313724/search
