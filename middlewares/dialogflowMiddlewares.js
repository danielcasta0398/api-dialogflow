
const { catchAsync } = require("../utils/catchAsync");
const { projectId, sessionClient} = require("../utils/dialogflow");

const detectIntent = catchAsync( async (req ,res ,next) => {

    const { message } = req.body
    console.log(message);

    let media = null;
    const sessionId = false;
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
    const languageCode = 'es'
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: languageCode,
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    const [singleResponse] = responses;
    const { queryResult } = singleResponse
    const { intent } = queryResult || { intent: {} }
    const parseIntent = intent['displayName'] || null
    const parsePayload = queryResult['fulfillmentMessages'].find((a) => a.message === 'payload');
    // console.log(singleResponse)
    if (parsePayload && parsePayload.payload) {
        const { fields } = parsePayload.payload
        media = fields.media.stringValue || null
    }
   

    const parseData = {
        replyMessage: queryResult.fulfillmentText,
        media,
        trigger: null
    }

    res.status(200).json(parseData)
} )


module.exports = { detectIntent }