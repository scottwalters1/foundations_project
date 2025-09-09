const { v4: uuidv4 } = require("uuid");
const ticketRepository = require("../repositories/ticketRepository");
const Ticket = require("../models/Ticket");

async function submitTicket(data) {
  const newTicket = new Ticket({
    ...data,
    ticketId: uuidv4(),
    createdAt: Date.now(),
  });
  await ticketRepository.submitTicket(newTicket);
  return { message: "Ticket Submitted" };
}

// check into whether i need to do await for all these or just return like this
async function getTicketById(ticketId) {
  return ticketRepository.getTicketById(ticketId);
}

async function getAllTickets() {
  const tickets = await ticketRepository.getAllTickets();
  return tickets;
}

async function getUnprocessedTickets() {
  const tickets = await ticketRepository.getUnprocessedTickets();
  return tickets;
}

async function getTicketsByUsername(username) {
  const tickets = await ticketRepository.getTicketsByUsername(username);
  return tickets;
}

async function processTicket(ticketId, newStatus) {

  // check into how to throw the errors or send messages here when wrong
  const ticketToProcess = await ticketRepository.getTicketById(ticketId);
  if (ticketToProcess.status !== "pending") {
    return { message: "Ticket already processed" };
  }

  if (!["approved", "denied"].includes(newStatus)) {
    return { message: "Invalid new status" };
  }

  const processedTicket = await ticketRepository.processTicket(ticketId, newStatus);
  return processedTicket;
}

module.exports = {
  submitTicket,
  getAllTickets,
  getUnprocessedTickets,
  getTicketsByUsername,
  getTicketById,
  processTicket
};
