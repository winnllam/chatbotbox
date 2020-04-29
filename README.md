![alt text](https://github.com/winnllam/chatbotbox/blob/master/client/public/chatbotbox.png)

# Chatbotbox

Chat box UI for Dialogflow

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

* Dialogflow agent created
* Google Cloud SDK

### Installing

Clone the repo:

```
git clone https://github.com/winnllam/chatbotbox.git
```

Run the startup script to install dependenies in both root and client folder, and the build in client.
Install the dependencies in both root and client folder:

```
yarn startup
```

Type in `yarn start` in the client folder to see the chat UI at [localhost:3000](http://localhost:3000)
  
The appearance of the chat box can be changed in `src/App.module.css` and `src/components/*/**.module.css`

## Getting a Response

To get a reply back from your Dialogflow agent, you'll need to get the **Service Account Key**. Instructions can be found [here](https://dialogflow.com/docs/reference/v2-auth-setup)

### Setting up `.env` file

Create a `.env` file and add the following:

```
REACT_APP_PROJECT_ID=<project-id>
REACT_APP_CLIENT_EMAIL=<client-email>
REACT_APP_PRIVATE_KEY=<private-key>
```

Replace `<project-id>`,`<client-email>` and `<private-key>` with the project id, client email and private key from the JSON file downloaded when setting up authentication.  

Use the same JSON file to run the following to be able to use the service account.
```
gcloud auth activate-service-account <client-email> --key-file="<path-to-json-file>"
```

## Running the App

To run the backend calling to Dialogflow and the frontend UI:

```
yarn start
```
in the root folder, at [localhost:5000](http://localhost:5000)

Now you can converse with your bot!

## Deployment

TBD - Current deployment attempts don't give a response

## Built With

* [React](https://reactjs.org) - Web Framework
* [Yarn](https://yarnpkg.com) - Package Manager
* [Dialogflow](https://dialogflow.com) - NLU
