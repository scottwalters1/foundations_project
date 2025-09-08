const dynamoDB = require("../db/dynamoClient");

// figure out this or syntax here
const TICKETS_TABLE = process.env.USERS_TABLE || "Tickets";

async function submitTicket(ticket) {
    const params = { TableName: TICKETS_TABLE, Item: ticket };
    return dynamoDB.put(params).promise();
}

module.exports = {
    submitTicket
};