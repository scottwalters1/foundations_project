const {
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");
const documentClient = require("../db/dynamoClient");

// figure out this or syntax here
const TICKETS_TABLE = process.env.USERS_TABLE || "Tickets";

async function submitTicket(ticket) {
  const command = new PutCommand({
    TableName: TICKETS_TABLE,
    Item: ticket,
  });

  try {
    await documentClient.send(command);
    return ticket;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getTicketById(ticketId) {
  const command = new GetCommand({
    TableName: TICKETS_TABLE,
    Key: {ticketId}
  });

  try {
    const data = await documentClient.send(command);
    
    return data.Item;
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

async function getUnprocessedTickets() {
  const command = new ScanCommand({
    TableName: TICKETS_TABLE,
    FilterExpression: "#s = :pending",
    ExpressionAttributeNames: {
      "#s": "status",
    },
    ExpressionAttributeValues: {
      ":pending": "pending",
    },
  });

  try {
    const data = await documentClient.send(command);
    console.log(data.Items);
    return data.Items;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getTicketsByUsername(username) {
  const command = new ScanCommand({
    TableName: TICKETS_TABLE,
    FilterExpression: "username = :username",
    // ExpressionAttributeNames: {
    //   "#s": "status",
    // },
    ExpressionAttributeValues: {
      ":username": username,
    },
  });

  try {
    const data = await documentClient.send(command);
    console.log(data.Items);
    return data.Items;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function processTicket(ticketId, newStatus) {
  const command = new UpdateCommand({
    TableName: TICKETS_TABLE,
    Key: {ticketId},
    UpdateExpression: "set #s = :newStatus",
    ExpressionAttributeNames: {
      "#s": "status",
    },
    ExpressionAttributeValues: {
      ":newStatus": newStatus,
    },
    ReturnValues: "ALL_NEW",
  });

  try {
    const response = await documentClient.send(command);
    return response.Attributes;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  submitTicket,
  getAllTickets,
  getUnprocessedTickets,
  getTicketsByUsername,
  processTicket,
  getTicketById
};
