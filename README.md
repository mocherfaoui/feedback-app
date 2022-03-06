# Next.js Feedback App

A feedback app that can be embedded in any website in order to let users comment or give back feedback, made with Next.js and Firebase.

## Prerequisities

- A Firebase database(Firestore).
- You’ll need to have Node 10.16.0 or later version on your local development machine (but it’s not required on the server). I recommend using the latest LTS version.

## Step 1: Setup

Install the dependencies for this project.

```sh
cd feedback-app
npm install
```

## Step 2: Create an .env file

In this step, you will have to create an `.env` file at the root of the directory, so that you can provide your environment variables. You can also rename the `.env.example` to `.env`

### Variables

The environment variables you define here are used to communicate with your Firestore database.

The variables below are required to initialize your Firebase App, you can learn more on that [here](https://firebase.google.com/docs/firestore/quickstart?authuser=0#initialize).

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`

The variables below are required for server-to-server communication and privileged access.

- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`

In order to get these variables above:

- Generate a private key from [here](https://console.firebase.google.com/project/feedback-app-ebcef/settings/serviceaccounts/adminsdk) and download it.
- Open the `.json` file and get the Private Key and Client Email.

Don't forget to copy the Firestore rules from [here](firestore.rules).

## Step 3: Start the App

Start a Node development server.

```sh
npm run dev
```

The application will open in your browser at http://localhost:3000

## Credits

Credits to [Lee Rob] and his amazing [React 2025 course].

[lee rob]: https://twitter.com/leeerob
[react 2025 course]: https://react2025.com/
