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
  runQuery(req.body.message.message).then((data) => {
    res.send({ reply: data });
  });
});

async function runQuery(message, projectId = "chat-bot-axlmpr") {
  let config = {
    credentials: {
      private_key: "dialogflow-ynkmpv@chat-bot-axlmpr.iam.gserviceaccount.com",
      client_email:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDfYDuBmQFJepJG\nkjKTvC/Rpo0dq9VmACm6/BrKVV+6vjoWvCQcsvaUYZw5oIhqtd/Vy/Irbg111usZ\nZCaGINwuY7Cf34E3irXabV1a2ykgen8Qmc+6ThK7ZYl3LEyKUbDb3GmreomW9a4O\nJ3sk2iS5RoW+kmHqj69zGxslYInoscgfOQf3KDp9YZu10AyDqRPV2vanw/FLEIpK\njwyH8fAwPB0pw2azLCxVs+UPsdK3CSnb8CA+VLGIWSFB1FT3n0fJgA+wZUvfGMxr\nSAeLyrrdSxFTz20osaUmLyKK9l1U4qPBuG6mmce+0cm+g88r8oPhzMlgApIuJ9D3\nIuhg15JHAgMBAAECggEAAXO0r1D5Syr6zG6i2Yb9oJU+kZTOXE1f+BEvc2U+rA4U\nfpVWfsFDDQ/dXhqHCHqKK++ZcWLTv5JYEOAvx+tqwvpu6XsgceX67KKNWsvV5pol\nPUxip0leoc01KYsmLDf/uE4kebLgNhT+vqTPDhxE5NdqgyScclPgxhTFBmcsPlD2\naKf94/sH1HNGYyLcN2yqBetufhgxz4yaAmIijBJH3iQUnynxu+TfRC5AI0ln7lF0\nMIkzvG+n1yoh8S7hAasaSSjmJsKZcmJXPtQvPqUfoFmUfIlEkSndgQls5NZXWrPw\nLcsIkJxKGv4y3OhDS/pujb2sA0xj2m6z2GrRWVYGgQKBgQD+c34NEyjq4oh4LKd3\n3RBObkyAcUq3orju9LTYUvV4NPZ0/qVXo5N/JN1KOd1MJpaP46y3cYbYtV/5AvyR\nIMs8OIXcoHhkCY01/+AlxqsUdJQD+OjRR6YExGuV7S7feKVm5tAp5aoQU5ZdNVcy\nFSGtqtGZq8gF5xtKPAMz5QT0YQKBgQDgvFDi3qLhWBS6ua+UeszIqMkbJ6NZD3S3\nlqrFgpxa4hBQ4qojlwtcCEPIyOI3Z/QZX/2Jd9YYB99AsbrOU8ILaJp2knqaUqsP\nGzj258G9j6bs1aPXtrhLtVY4U7j0OAHQ2PoU5Hq0PpRzFR4RhsDkiJLFWwwvPRmU\newabJt2HpwKBgQCpHswuFokArTZ1YYChm23mI0t3p1U4/s+aC01T5re+gL06f7IX\nsOItBKyMVC9xGMjDtFisyKkOymaSlFiYgUpzqUHXpVS/cNXJiVtK4GP/QYjLpxnf\nV5bR3ld/m9imsYKGBW1gG4TQOy5an0RoRkFPM5UCZXmZ6sRpr7+VM2f6oQKBgQCD\n6KTFdQ4/nFaWfxT63tVCViesY6iyRqsocywLQC2L/rK690AMIcUOIN/Ag4CcKs0Q\n89G6FXe5pS06KNfP8UOtNJmtTS7fU/SJql3WNpP2MtI0ovVHUT19WpOf/ixKVHFk\nZ2bqSm1nTHAP2G5MtT6VJUCYzGcrdv6Ds25eNQLEcwKBgA3AoKxE/JNybSUncBqB\nEFesxeJ1Ey8C16gURuKtzdnKYMpyJ1VAZWSl3A0T0mETvEL2TctAXKZJIcKnR38v\ngGsb6CmGnB5pkThkF2JCzUitS2AuRhlSSIpXq9mYRxVoJKE02DQV6YOWpBsjrN9z\n3uvOJdog4kV5ICDenNtHaE9W\n-----END PRIVATE KEY-----\n",
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
