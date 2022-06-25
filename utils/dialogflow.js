const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const dotenv = require('dotenv');
const fs = require('fs')
dotenv.config( {path:'./config.env'} )

let projectId
let sessionClient
let configuration

const checkFileCredentials = () => {
    if(!fs.existsSync(`${__dirname}/../chatbot-account.json`)){
        return false
    }

    const parseCredentials = JSON.parse(fs.readFileSync(`${__dirname}/../chatbot-account.json`));
    projectId = parseCredentials.project_id;
    configuration = {
        credentials: {
            private_key: parseCredentials['private_key'],
            client_email: parseCredentials['client_email']
        }
    }

    sessionClient = new dialogflow.SessionsClient(configuration);
}


 checkFileCredentials()   

module.exports = { sessionClient, projectId }