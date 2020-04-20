const dialogflow = require("dialogflow");
const uuid = require("uuid");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

const sessionId = uuid.v4();

//require("dotenv").config();

app.use(express.static(path.join(__dirname, "client/build")));

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.post("/query", (req, res) => {
  runQuery(req.body.message.message)
    .catch(console.log("query failed"))
    .then((data) => {
      res.send({ reply: data });
    });
});

async function runQuery(message, projectId = process.env.REACT_APP_PROJECT_ID) {
  let config = {
    credentials: {
      private_key: process.env.REACT_APP_PRIVATE_KEY,
      client_email: process.env.REACT_APP_CLIENT_EMAIL,
    },
  };
  const sessionClient = new dialogflow.SessionsClient(config);
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: "en-US",
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);

  let query = [result.queryText, result.fulfillmentText];
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
    query.push(result.intent.displayName);
  } else {
    console.log(`  No intent matched.`);
    query.push("No intent");
  }

  if (result.parameters.fields["given-name"]) {
    query.push(result.parameters.fields["given-name"].stringValue);
  }
  return query;
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log("Running on port " + port);
});
