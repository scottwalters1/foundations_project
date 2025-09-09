const { PutCommand, GetCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const documentClient = require("../db/dynamoClient");

// figure out this or syntax here
const TICKETS_TABLE = process.env.USERS_TABLE || "Tickets";

async function submitTicket(ticket) {
  const command = new PutCommand({
    TableName: TICKETS_TABLE,
    Item: ticket
  });

  try {
    await documentClient.send(command);
    return ticket;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getAllTickets() {
  const command = new ScanCommand({
    TableName: TICKETS_TABLE,
  });
  
  try {
    const data = await documentClient.send(command);

    return data.Items;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// async function getUnprocessedTickets() {
//   const params = {
//     TableName: TICKETS_TABLE,
//     FilterExpression: "status = :pending",
//   };
//   const result = await dynamoDB.scan(params).promise();
//   return result;
// }

module.exports = {
  submitTicket,
  getAllTickets,
  // getUnprocessedTickets
};
