const dynamoDB = require("../db/dynamoClient");

// figure out this or syntax here
const TICKETS_TABLE = process.env.USERS_TABLE || "Tickets";

async function submitTicket(ticket) {
  const params = { TableName: TICKETS_TABLE, Item: ticket };
  return dynamoDB.put(params).promise();
}

async function getAllTickets() {
  const params = { TableName: TICKETS_TABLE  };
  const result = await dynamoDB.scan(params).promise();
  return result;
}

module.exports = {
  submitTicket,
  getAllTickets
};
