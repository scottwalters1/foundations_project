const { v4: uuidv4 } = require("uuid");
const ticketRepository = require("../repositories/ticketRepository");
const Ticket = require("../models/Ticket");

function getAllTickets() {
  return ticketRepository.getAllTickets();
}

function getUnprocessedTickets() {
  return ticketRepository.getUnprocessedTickets();
}

function getTicketById(ticketId) {
  return ticketRepository.getTicketById(ticketId);
}

function getTicketsByUsername(username) {
  return ticketRepository.getTicketsByUsername(username);
}

async function submitTicket(data, username) {
  const newTicket = new Ticket({
    ...data,
    username,
    ticketId: uuidv4(),
    createdAt: Date.now(),
  });
  await ticketRepository.submitTicket(newTicket);
  return newTicket;
}

async function processTicket(ticketId, newStatus) {
  const ticketToProcess = await ticketRepository.getTicketById(ticketId);

  if (!ticketToProcess) {
    throw new Error("Ticket not found");
  }
  if (ticketToProcess.status !== "pending") {
    throw new Error("Ticket already processed");
  }
  if (!["approved", "denied"].includes(newStatus)) {
    throw new Error("Invalid new status");
  }

  return ticketRepository.processTicket(ticketId, newStatus);
}

module.exports = {
  submitTicket,
  getAllTickets,
  getUnprocessedTickets,
  getTicketsByUsername,
  getTicketById,
  processTicket,
};
