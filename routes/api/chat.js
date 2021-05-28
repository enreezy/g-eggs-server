const express = require("express");
const router = express.Router();
const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
const path = require("path");

const Chat = require("../../models/Chat");

router.get("/", async (req, res) => {
  const message = await runSample("g-egg-ybef");
  res.json(message);
});

router.post("/", async (req, res) => {
  const newMessage = Chat({
    message: req.body.message,
  });

  newMessage.save();

  const message = await runSample("g-egg-ybef", req.body.message);
  res.json(message);
});

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(projectId, message) {
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: path.resolve(__dirname, "<JSON FILE>"),
  });
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: message,
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  return result.fulfillmentText;
}

module.exports = router;
